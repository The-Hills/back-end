import { Router } from "express";
import bookingController from "./../controllers/Booking.controller";

const bookingRouter = Router();

bookingRouter.post("/pickup/:id", bookingController.pickup);
bookingRouter.post("/acceptbooking/:id", bookingController.accpect);
bookingRouter.post("/completedbooking/:id", bookingController.completed);
bookingRouter.get("/getbooking/:type", bookingController.showListBooking);
bookingRouter.post("/getprice", bookingController.getPrice);
bookingRouter.get("/statistical", bookingController.statistical);
bookingRouter.get("/statisticalbydate", bookingController.statisticalByDate);
bookingRouter.get("/statisticalbymonth", bookingController.statisticalByMonth);
bookingRouter.post("/", bookingController.store);
bookingRouter.delete("/:id", bookingController.destroy);
bookingRouter.get("/:id", bookingController.show);
bookingRouter.get("/", bookingController.index);

export default bookingRouter;
