import { Request, Response, NextFunction } from "express";
import bookingRepository from "./../repositories/Booking.repository";
import bookingService from "./../services/booking.service";

const bookingController = {
  index: async (req: Request, res: Response) => {
    const listBooking = await bookingRepository.getALlBooking();
    if (listBooking.length > 0) {
      res.status(200).json({ massage: "Succesefully", data: listBooking });
    } else {
      res.status(200).json({ message: "Null" });
    }
  },

  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const booking = await bookingRepository.createBooking(data);

      res.status(200).json({ massage: "Succesefully", data: booking });
    }
    catch (err) {
      next({ status: 400, message: err })
    }
  },

  showListBooking: async (req: Request, res: Response) => {
    const { type } = req.params;
    const listBooking = await bookingRepository.getListBookingWaitingDriver(
      type
    );
    if (listBooking.length > 0) {
      return res
        .status(200)
        .json({ massage: "Succesefully", data: listBooking });
    }
    return res
      .status(200)
      .json({ massage: "Succesefully", data: "List empty" });
  },

  accpect: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const booking = await bookingRepository.updateAccpectBooking(id, data);
      console.log(booking);

      if (booking) {
        return res.status(200).json({ massage: "Succesefully", data: booking });
      }
      next({ status: 404, message: "Not found" })
    } catch (err) {
      next({ status: 400, message: err })
    }

  },

  completed: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const booking = await bookingRepository.updateCompletedBooking(id);
      console.log(booking);

      if (booking) {
        return res.status(200).json({ massage: "Succesefully", data: booking });
      }
      next({ status: 404, message: "Not found" })
    } catch (err) {
      next({ status: 400, message: err })
    }

  },

  getPrice: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { distance, type } = req.body;
      const result = await bookingService.caclulatedPrice(distance, type);
      return res.status(200).json({
        message: "Successfully",
        data: result,
      });
    } catch (err) {
      next({ status: 400, message: err })
    }

  },

  statistical: async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { total, count, data } = await bookingRepository.statistical()
      return res.status(200).json({
        message: "Successfully",
        data: {
          total,
          count,
          data,

        },
      });
    }
    catch (err) {
      next({ status: 400, message: err })
    }
  },

  statisticalByDate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { date } = req.query

      const { booking, countBooking, total } = await bookingRepository.statisticalByDate(date)
      return res.status(200).json({
        message: "Successfully",
        data: {
          booking, countBooking, total
        },
      });
    }
    catch (err) {
      next({ status: 400, message: err })
    }
  },

  statisticalByMonth: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { month } = req.query

      const result = await bookingRepository.statisticalByMonth(month)
      return res.status(200).json({
        message: "Successfully",
        data: result,
      });
    }

    catch (err) {
      next({ status: 400, message: err })
    }
  }
};

export default bookingController;
