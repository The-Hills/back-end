import "reflect-metadata";
import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
// import * as cookieParser from "cookie-parser";
// import * as sessions from "express-session";
import route from "./routes";

import { AppDataSource } from "./data-source";

const app = express();

app.use(morgan("combined"));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

// app.use(
//   sessions({
//     secret: "",
//     saveUninitialized: true,
//     cookie: {},
//     resave: false,
//   })
// );

// app.use(cookieParser());

const port = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("connect");
  })
  .catch((error) => {
    console.log("error =>", error);
  });

route(app);

app.listen(port);
