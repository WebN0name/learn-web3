import { ApiProperty } from '@nestjs/swagger'

export class TransferBody {
    @ApiProperty()
    from: string

    @ApiProperty()
    to: string

    @ApiProperty()
    privateKey: string

    @ApiProperty()
    amount: number
}