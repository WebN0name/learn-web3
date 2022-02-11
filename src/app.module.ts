import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Web3Module } from './web3/web3.module';
import { TransactionsModule } from './transactions/transactions.module';
import { Web3Service } from './web3/web3.service';
import { TransferModule } from './transfer/transfer.module';
import { BalanceModule } from './balance/balance.module';
import { FeeModule } from './fee/fee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    Web3Module,
    TransactionsModule,
    TransferModule,
    BalanceModule,
    FeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private readonly web3Service: Web3Service
  ) { }

  async onModuleInit() {
    const testNetwork = await this.web3Service.web33WS.eth.isSyncing()
    console.log(testNetwork)
  }
}
