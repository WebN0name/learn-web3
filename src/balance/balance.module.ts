import { Module } from '@nestjs/common';
import { Web3Module } from 'src/web3/web3.module';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

@Module({
  imports: [
    Web3Module
  ],
  controllers: [BalanceController],
  providers: [BalanceService]
})
export class BalanceModule {}
