import { Module } from '@nestjs/common';
import { Web3Module } from 'src/web3/web3.module';
import { FeeController } from './fee.controller';
import { FeeService } from './fee.service';

@Module({
  imports: [
    Web3Module
  ],
  controllers: [FeeController],
  providers: [FeeService]
})
export class FeeModule {}
