import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseError } from 'src/BaseError';
import { Web3Service } from 'src/web3/web3.service';

@Injectable()
export class FeeService {
    constructor(
        private readonly web3Service: Web3Service
    ) { }

    async getFee() {
        try {
            const pendingBlock = await this.web3Service.web33WS.eth.getBlock('pending')
            let baseFeePerGas = Number(this.web3Service.web33WS.utils.hexToNumberString(pendingBlock.baseFeePerGas))
            let maxPriorityFeePerGas = await this.web3Service.web33WS.eth.getMaxPriorityFeePerGas()
            maxPriorityFeePerGas = this.web3Service.web33WS.utils.hexToNumberString(maxPriorityFeePerGas)
            let fee = (Number(baseFeePerGas) + Number(maxPriorityFeePerGas)) * 21000
            const feeToEth = this.web3Service.web33WS.utils.fromWei(fee.toString(), 'ether')

            return {fee: feeToEth}
        } catch (error) {
            if (error.statusCode) {
                throw new BaseError(error.message, error.statusCode)
            }
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
