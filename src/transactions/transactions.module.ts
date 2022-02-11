import { Module } from '@nestjs/common';
import { Web3Module } from 'src/web3/web3.module';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [
    Web3Module
  ],
  providers: [TransactionsService]
})
export class TransactionsModule {}
