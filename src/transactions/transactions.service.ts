import { Injectable } from '@nestjs/common';
import { Web3Service } from 'src/web3/web3.service';

@Injectable()
export class TransactionsService {
    constructor(
        private readonly web3Service: Web3Service
    ){
        this.init()
    }

    async init(){
        try {
            // подписываемся на блок
            this.web3Service.web33WS.eth.subscribe('newBlockHeaders', function () {
            }).on('connected', function (subscriptionId: any) {
                console.log(subscriptionId)
            }).on("data", async (blockHeader: any) => {
                //получаем блок
                const block: any = await this.web3Service.web33WS.eth.getBlock(blockHeader.number)
                const transactions = block.transactions
                for (let i = 0; i < transactions.length; i++) {     
                    // получаем транзакции               
                    const trx = await this.web3Service.web33WS.eth.getTransaction(transactions[i])
                    // console.log(trx)
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
