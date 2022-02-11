import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseError } from 'src/BaseError';
import { Web3Service } from 'src/web3/web3.service';

@Injectable()
export class BalanceService {
    constructor(
        private readonly web3Service: Web3Service
    ) { }

    async getBalance(address: string) {
        try {
            const isAddress = this.web3Service.web33WS.utils.isAddress(address)
            if (!isAddress)
                throw new BaseError('invalid address', HttpStatus.BAD_REQUEST)
            let balance = await this.web3Service.web33WS.eth.getBalance(address)
            balance = this.web3Service.web33WS.utils.fromWei(balance.toString(), 'ether')

            return balance
        } catch (error) {
            if (error.statusCode) {
                throw new BaseError(error.message, error.statusCode)
            }
            throw new BaseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
