import { Module } from '@nestjs/common';
import { Web3Module } from 'src/web3/web3.module';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';

@Module({
  imports: [
    Web3Module,
  ],
  controllers: [TransferController],
  providers: [TransferService]
})
export class TransferModule {}
