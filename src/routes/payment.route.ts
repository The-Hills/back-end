import { Router } from "express";
import { VNPayReturnURL, checkIsSuccessfully, create_Payment_URL } from "../controllers/payment.controller";

const paymetRouter = new Router()

paymetRouter.get('/vnpay_ipn', checkIsSuccessfully)
paymetRouter.get('/vnpay_return', VNPayReturnURL)
paymetRouter.post('/create_payment_url', create_Payment_URL)

export default paymetRouter