import { Request, Response } from "express";
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

  store: async (req: Request, res: Response) => {
    const data = req.body;

    const booking = await bookingRepository.createBooking(data);

    if (booking) {
      res.status(200).json({ massage: "Succesefully", data: booking });
    } else {
      res.status(400).json({ message: "", error: "" });
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

  accpect: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const booking = await bookingRepository.updateAccpectBooking(id, data);
    console.log(booking);

    if (booking) {
      res.status(200).json({ massage: "Succesefully", data: booking });
    } else {
      res.status(400).json({ message: "", error: "" });
    }
  },

  completed: async (req: Request, res: Response) => {
    const { id } = req.params;

    const booking = await bookingRepository.updateCompletedBooking(id);
    console.log(booking);

    if (booking) {
      res.status(200).json({ massage: "Succesefully", data: booking });
    } else {
      res.status(400).json({ message: "", error: "" });
    }
  },

  getPrice: async (req: Request, res: Response) => {
    const { distance, type } = req.body;
    const result = await bookingService.caclulatedPrice(distance, type);
    if (result) {
      return res.status(200).json({
        message: "Successfully",
        data: result,
      });
    }
    return res.status(500).json({
      message: "Error",
    });
  },
};

export default bookingController;
