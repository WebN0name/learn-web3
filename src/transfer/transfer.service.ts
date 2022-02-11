import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseError } from 'src/BaseError';
import { Web3Service } from 'src/web3/web3.service';

@Injectable()
export class TransferService {
    constructor(
        private readonly web3Service: Web3Service
    ) { }

    async transfer(from: string, to: string, privateKey: string, amount: number) {
        try {
            const isAddressFrom = this.web3Service.web33WS.utils.isAddress(from)
            if (!isAddressFrom)
                throw new BaseError('invalid address from', HttpStatus.BAD_REQUEST)

            const isAddressTo = this.web3Service.web33WS.utils.isAddress(to)
            if (!isAddressTo)
                throw new BaseError('invalid address to', HttpStatus.BAD_REQUEST)

            const nonce = await this.web3Service.web33WS.eth.getTransactionCount(from, "latest")
            const pendingBlock = await this.web3Service.web33WS.eth.getBlock('pending')
            let baseFeePerGas = Number(this.web3Service.web33WS.utils.hexToNumberString(pendingBlock.baseFeePerGas))
            let maxPriorityFeePerGas = await this.web3Service.web33WS.eth.getMaxPriorityFeePerGas()
            maxPriorityFeePerGas = this.web3Service.web33WS.utils.hexToNumberString(maxPriorityFeePerGas)
            let fee = (Number(baseFeePerGas) + Number(maxPriorityFeePerGas)) * 21000
            const balance = await this.web3Service.web33WS.eth.getBalance(from)

            const amountInWei = Number(this.web3Service.web33WS.utils.toWei(amount.toString()))

            if ((balance - amountInWei - fee) < 0)
                throw new BaseError('not enoth money', HttpStatus.BAD_REQUEST)

            const transaction = {
                to,
                value: this.web3Service.web33WS.utils.toHex(amountInWei),
                nonce: nonce,
                maxPriorityFeePerGas,
                gas: this.web3Service.web33WS.utils.toHex(21000)
            }

            const SignTrx = await this.web3Service.web33WS.eth.accounts.signTransaction(transaction, privateKey)

            this.web3Service.web33WS.eth.sendSignedTransaction(SignTrx.rawTransaction as string, async (error: any, hash: any) => {
                if (!error) {
                    console.log(hash)
                } else {
                    throw new Error(error)
                }
            })


        } catch (error) {
            if (error.statusCode) {
                throw new BaseError(error.message, error.statusCode)
            }
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
