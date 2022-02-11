import { Controller, Get, HttpException } from '@nestjs/common';
import { FeeService } from './fee.service';

@Controller('fee')
export class FeeController {
    constructor(
        private readonly feeService: FeeService
    ){}
    @Get('')
    async getFee(){
        try {
            const fee = await this.feeService.getFee()

            return fee
        } catch (error) {
            throw new HttpException(error.message, error.statusCode)
        }
    }
}
