import "reflect-metadata";
import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { AppDataSource } from "./data-source";
import errorMiddleware from "./middlewares/errorMiddleware";
import rootRouter from "./routes/index";
import * as fileUpload from "express-fileupload";

const app = express();

app.use(morgan("combined"));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.use(
  cors({
    origin: "*",
  })
);

app.use(fileUpload());

const port = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("connect");
  })
  .catch((error) => {
    console.log("error =>", error);
  });

app.use("/api", rootRouter);
app.use(errorMiddleware);

app.listen(port);
