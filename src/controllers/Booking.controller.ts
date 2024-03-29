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

  show: async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { id } = req.params;

      const booking = await bookingRepository.getBookingById(id)

      if (booking) {
        return res.status(200).json({ massage: "Succesefully", data: booking })
      }
      next({ status: 404, message: "Not found" })
    }
    catch (err) {
      next({ status: 400, message: err })
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

      if (booking) {
        return res.status(200).json({ massage: "Succesefully", data: booking });
      }
      next({ status: 404, message: "Not found" })
    } catch (err) {
      next({ status: 400, message: err })
    }
  },

  pickup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      const booking = await bookingRepository.updatePickUp(id)
      if (booking) {
        return res.status(200).json({ massage: "Succesefully", data: booking });
      }
    }
    catch (err) {
      next({ status: 400, message: err })
    }
  },

  completed: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const booking = await bookingRepository.updateCompletedBooking(id);

      if (booking) {
        return res.status(200).json({ massage: "Succesefully", data: booking });
      }
      next({ status: 404, message: "Not found" })
    } catch (err) {
      next({ status: 400, message: err })
    }

  },

  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const booking = await bookingRepository.deleteBooking(id);

      if (booking) {
        return res.status(200).json({ massage: "Succesefully", data: booking });
      }
      next({ status: 404, message: "Not found" })
    }
    catch (err) {
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

      const { total, count, result } = await bookingRepository.statistical()
      return res.status(200).json({
        message: "Successfully",
        data: {
          total,
          count,
          result,
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
      const { month, year } = req.query

      const { total, countBooking, totalPriceBooking, quantity } = await bookingRepository.statisticalByMonth(month, year)
      return res.status(200).json({
        message: "Successfully",
        data: { total, countBooking, totalPriceBooking, quantity },
      });
    }

    catch (err) {
      next({ status: 400, message: err })
    }
  }
};

export default bookingController;
