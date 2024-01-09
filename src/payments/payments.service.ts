import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { HttpService } from '@nestjs/axios';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {

  constructor(private readonly httpService: HttpService) { }

  async makePayment(createPaymentDto: CreatePaymentDto) {

    const merchantTransactionId = "MTI" + Date.now()

    const payload = {
      merchantTransactionId,
      merchantUserId: "UI" + createPaymentDto.userId,
      amount: createPaymentDto.amount,
      merchantId: process.env.PHONEPE_MERCHANT_ID,
      redirectUrl: `http://localhost:3000/payments/getPaymentStatus/${merchantTransactionId}`,
      redirectMode: "POST",
      callbackUrl: `http://localhost:3000/payments/getPaymentStatus/${merchantTransactionId}`,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    }

    const data = JSON.stringify(payload);
    const payloadMain = Buffer.from(data).toString('base64');
    const keyIndex = 2;
    const string = payloadMain + '/pg/v1/pay' + process.env.PHONEPE_SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;
    const url = process.env.PHONEPE_URL
    const body = {
      request: payloadMain
    }
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum
    }

    return await this.httpService.axiosRef.post(url, body, { headers });

  }

  async getPaymentStatus(merchantTransactionId: string) {

    const merchantId = process.env.PHONEPE_MERCHANT_ID
    const keyIndex = 2;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + process.env.PHONEPE_SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
      'X-MERCHANT-ID': `${merchantId}`
    }
    const url = `${process.env.PHONEPE_STATUS_URL}${merchantId}/${merchantTransactionId}`

    return await this.httpService.axiosRef.get(url, { headers });

  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
