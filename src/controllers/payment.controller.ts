import { Request, Response } from "express";
import * as dotenv from "dotenv";
// import dateFormat from "dateformat";
import * as QueryString from "qs";
import { getCreateDate } from './../utils/helper';
import paymentRepository from './../repositories/Payment.repository';
import { PaymentPayload } from "../utils/interfaces";
import { PaymentStatus } from "../utils/Enum";

dotenv.config();



// Create URL 
export const create_Payment_URL = async (req: Request, res: Response) => {

  const tmnCode = process.env.VNP_TMNCODE;
  const secretKey = process.env.VNP_HASHSECRET;
  let vnpUrl = process.env.VNP_URL;
  const returnUrl = process.env.VNP_RETURN_URL;

  const {amount, bankCode, orderInfo, ipAddress} = req.body

   const vnp_CreateDate = getCreateDate(new Date());

   const currCode = 'VND';

   const data: PaymentPayload = req.body;
   data.createDate = vnp_CreateDate;
   data.paymentInfo = orderInfo;
   data.amount = amount * 100;

   const payment = await paymentRepository.createPayment(data)
  
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = 'en';
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = payment.id;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddress;
  vnp_Params["vnp_CreateDate"] = vnp_CreateDate;
  if (bankCode !== null && bankCode !== "" && bankCode !== undefined) {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  const signData = QueryString.stringify(vnp_Params, { encode: false });
  const crypto = require("crypto");
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update( Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + QueryString.stringify(vnp_Params, { encode: false });

  res.status(200).json({url: vnpUrl})
};

// VPN reurn response when user request payment
export const checkIsSuccessfully = async (req: Request, res: Response) => {
  let vnp_Params = req.query;
  let secureHash = vnp_Params["vnp_SecureHash"];

  let orderId = vnp_Params["vnp_TxnRef"];
  let rspCode = vnp_Params["vnp_ResponseCode"];
  const amount = vnp_Params['vnp_Amount']

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  let secretKey = process.env.VNP_HASHSECRET;
  let querystring = require("qs");
  let signData = querystring.stringify(vnp_Params, { encode: false });
  let crypto = require("crypto");
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update( Buffer.from(signData, "utf-8")).digest("hex");

  
  const payment = await paymentRepository.getPaymentById(orderId)

  let paymentStatus = payment.status ;
  
  let checkOrderId = false; // M?? ????n h??ng "gi?? tr??? c???a vnp_TxnRef" VNPAY ph???n h???i t???n t???i trong CSDL c???a b???n
  if (orderId === payment.id) {
    checkOrderId = true;
  }
  let checkAmount = false;
  
  if(Number(amount) === payment.amount) checkAmount = true;

  // Ki???m tra s??? ti???n "gi?? tr??? c???a vnp_Amout/100" tr??ng kh???p v???i s??? ti???n c???a ????n h??ng trong CSDL c???a b???n
  if (secureHash === signed) {
    //ki???m tra checksum
    if (checkOrderId) {
      if (checkAmount) {
        if (paymentStatus === 'DOING' ) {
          //ki???m tra t??nh tr???ng giao d???ch tr?????c khi c???p nh???t t??nh tr???ng thanh to??n
          if (rspCode == "00") {
            //thanh cong
            paymentRepository.updatePaymentStatus(payment.id, PaymentStatus.SUCCESS)
            // ??? ????y c???p nh???t tr???ng th??i giao d???ch thanh to??n th??nh c??ng v??o CSDL c???a b???n
            res.status(200).json({ RspCode: "00", Message: "Success", vnp_Params });
          } else {
            //that bai
             paymentRepository.updatePaymentStatus(payment.id, PaymentStatus.FAIL)
            // ??? ????y c???p nh???t tr???ng th??i giao d???ch thanh to??n th???t b???i v??o CSDL c???a b???n
            res.status(200).json({ RspCode: "00", Message: "Success" });
          }
        } else {
          res.status(200).json({
            RspCode: "02",
            Message: "This order has been updated to the payment status",
          });
        }
      } else {
        res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
      }
    } else {
      res.status(200).json({ RspCode: "01", Message: "Order not found" });
    }
  } else {
    res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
  }
};

export const VNPayReturnURL = (req: Request, res: Response) => {
  let vnp_Params = req.query;

  console.log('VNPayReturnURL')

  const secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  const secretKey = process.env.VNP_HASHSECRET;

  const querystring = require("qs");
  const signData = querystring.stringify(vnp_Params, { encode: false });
  const crypto = require("crypto");
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    
    res.redirect('https://www.facebook.com/')   
  } else {
    res.status(500).json({message: "Fail", code: "97" });
  }
};

const sortObject = (obj: any) => {
  let sorted = {};
  let str = [];
  let key: any;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}