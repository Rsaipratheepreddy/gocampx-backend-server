import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class SmsCountry {

    constructor(private readonly httpService: HttpService) { }

    async sendSMS() {

        try {
            const url = 'https://private-anon-2b83fe4905-smscountryapi.apiary-proxy.com/v0.1/Accounts/authKey/SMSes/';
            const body = {
                text: "",
                Number: "",
            };
            const bufferObj = Buffer.from(`${process.env.SMS_COUNTRY_AUTH_KEY}:${process.env.SMS_COUNTRY_AUTH_TOKEN}`, "utf8");
            const base64String = bufferObj.toString("base64");
            const headers = {
                "Authorization": `Basic ${base64String}`
            }
            const response = await this.httpService.axiosRef.post(url, body, { headers });
            return response.data
        } catch (e) {
            throw new HttpException(e.response.data, e.response.status);
        }
    }

}