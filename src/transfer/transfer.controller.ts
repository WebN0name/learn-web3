import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { TransferBody } from 'src/DTO/transfer.dto';
import { TransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {
    constructor(
        private readonly transferService: TransferService
    ){}
    @Post('')
    async sendTransaction(
        @Body() body: TransferBody
    ){
        try {
            const {from, to, privateKey, amount} = body
            const res = await this.transferService.transfer(from, to, privateKey, amount)

            return res
        } catch (error) {
            throw new HttpException(error.message, error.statusCode)
        }
    }
}
