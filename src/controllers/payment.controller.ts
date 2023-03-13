import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
// import dateFormat from "dateformat";
import * as QueryString from "qs";
import { getCreateDate } from './../utils/helper';
import paymentRepository from './../repositories/Payment.repository';
import { PaymentPayload } from "../utils/interfaces";
import { PaymentStatus } from "../utils/Enum";
import * as crypto from 'crypto'


dotenv.config();



// Create URL 
export const create_Payment_URL = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const tmnCode = process.env.VNP_TMNCODE;
    const secretKey = process.env.VNP_HASHSECRET;
    let vnpUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURN_URL;

    const { amount, ipAddress } = req.body

    const vnp_CreateDate = getCreateDate(new Date());

    const currCode = 'VND';

    const data: PaymentPayload = req.body;
    data.createDate = vnp_CreateDate;
    data.paymentInfo = "Pikid Payment";
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
    vnp_Params["vnp_OrderInfo"] = "Pikid Payment";
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddress;
    vnp_Params["vnp_CreateDate"] = vnp_CreateDate;


    vnp_Params = sortObject(vnp_Params);

    const signData = QueryString.stringify(vnp_Params, { encode: false });
    const crypto = require("crypto");
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + QueryString.stringify(vnp_Params, { encode: false });
    res.status(200).json({ url: vnpUrl })
  }
  catch (err) {
    next({ status: 400, message: err })
  }

};

// VPN reurn response when user request payment
export const checkIsSuccessfully = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let vnp_Params = req.query;
    let secureHash = vnp_Params["vnp_SecureHash"];

    let orderId = vnp_Params["vnp_TxnRef"];
    let rspCode = vnp_Params["vnp_ResponseCode"];
    const amount = vnp_Params["vnp_Amount"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    let secretKey = process.env.VNP_HASHSECRET;
    let signData = QueryString.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    const payment = await paymentRepository.getPaymentById(orderId);

    let paymentStatus = payment.status;

    let checkOrderId = false; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    if (orderId === payment.id) {
      checkOrderId = true;
    }
    let checkAmount = false;

    console.log('rspCode =>', rspCode)

    if (Number(amount) === payment.amount) checkAmount = true;

    // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    if (secureHash === signed) {
      //kiểm tra checksum
      if (checkOrderId) {
        if (checkAmount) {
          if (paymentStatus === "DOING") {
            //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
            if (rspCode == "00") {
              //thanh cong
              paymentRepository.updatePaymentStatus(
                payment.id,
                PaymentStatus.SUCCESS
              );
              // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
              res.status(200).json({ code: "00", message: "Success", vnp_Params });
            } else {
              //that bai
              paymentRepository.updatePaymentStatus(payment.id, PaymentStatus.FAIL);
              // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
              res.status(200).json({ code: "00", message: "Fail" });
            }
          } else {
            res.status(200).json({
              code: "02",
              message: "This order has been updated to the payment status",
            });
          }
        } else {
          next({ status: 400, code: "04", message: "Amount invalid" });
        }
      } else {
        next({ status: 404, code: "01", message: "Order not found" });
      }
    } else {
      next({ status: 400, code: "97", message: "Checksum failed" });
    }

  }
  catch (err) {
    next({ status: 500, message: err })
  }
};

export const VNPayReturnURL = (req: Request, res: Response, next: NextFunction) => {
  try {
    let vnp_Params = req.query;

    const secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    const secretKey = process.env.VNP_HASHSECRET;

    const signData = QueryString.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      res.status(200).json({ message: "Successfully" })

      // res.redirect('https://www.facebook.com/')
    } else {
      next({ status: 400, message: "Fail", code: "97" })
    }
  }
  catch (err) {
    next({ status: 500, message: err })
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