import { Injectable } from '@nestjs/common';
const AlchemyWeb3 = require("@alch/alchemy-web3")

@Injectable()
export class Web3Service {
    public web33WS = AlchemyWeb3.createAlchemyWeb3(process.env.ETH_WS as string)
    public Web3HTTP = AlchemyWeb3.createAlchemyWeb3(process.env.ETH_HTTP as string)
}
