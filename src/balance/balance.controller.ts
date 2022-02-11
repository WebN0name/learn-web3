import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
    constructor(
        private readonly balanceService: BalanceService
    ){}
    @Get('/:address')
    async getBalance(
        @Param('address') address: string,
    ){
        try {
            const balance = await this.balanceService.getBalance(address)
            return balance
        } catch (error) {
            throw new HttpException(error.message, error.statusCode)
        }
    }
}
