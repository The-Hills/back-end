import { Request, Response } from "express";
import bookingRepository from "./../repositories/Booking.repository";

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
};

export default bookingController;
