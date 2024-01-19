
import { HttpService } from '@nestjs/axios';

export async function sendMsgToUserMobile(msg: string, mobileNo: number) {
  const url = process.env.SMS_COUNTRY_URL
  const body = {
    "Text": `login OTP is ${msg} - ${process.env.SENDER_ID}`,
    "Number": `91${mobileNo}`,
    "SenderId": process.env.SENDER_ID,
    "DRNotifyUrl": "https://www.domainname.com/notifyurl",
    "DRNotifyHttpMethod": "POST",
    "Tool": "API"
  }
  const httpService = new HttpService()
  const bufferObj = Buffer.from(`${process.env.SMS_COUNTRY_AUTH_KEY}:${process.env.SMS_COUNTRY_AUTH_TOKEN}`, "utf8");
  const base64String = bufferObj.toString("base64");
  const headers = {
    "Authorization": `Basic ${base64String}`
  }
  return await httpService.axiosRef.post(url, body, { headers });
}