import { PaymentStatus } from '../utils/Enum';
import { PaymentPayload } from '../utils/interfaces';
import { AppDataSource } from './../data-source';
import { Payment } from './../entities/Payment.entity';

const paymetRepo = AppDataSource.getRepository(Payment)

const paymentRepository = {
    createPayment: async (paymentPayload: PaymentPayload) => {
        const { amount, createDate, paymentInfo, status} = paymentPayload


        const newPayment = paymetRepo.create({
            amount,
            createDate,
            paymentInfo,
            status,
        })

        return await paymetRepo.save(newPayment)
    },

    getPaymentById: async (id: string) => {
        const payment = await paymetRepo.findOneBy({
            id
        })

        return payment
    },

    updatePaymentStatus: async (id: string, status: PaymentStatus) => {
         const payment = await paymetRepo.findOneBy({
            id
        })

        payment.status = status || payment.status

        return await paymetRepo.save(payment)
    }
}

export default paymentRepository