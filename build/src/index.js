"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
var data_source_1 = require("./data-source");
var errorMiddleware_1 = require("./middlewares/errorMiddleware");
var index_1 = require("./routes/index");
var fileUpload = require("express-fileupload");
var app = express();
app.use(morgan("combined"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
}));
app.use(cors({
    origin: "*",
}));
app.use(fileUpload());
var port = 3000;
data_source_1.AppDataSource.initialize()
    .then(function () {
    console.log("connect");
})
    .catch(function (error) {
    console.log("error =>", error);
});
app.use("/api", index_1.default);
app.use(errorMiddleware_1.default);
app.listen(port);
//# sourceMappingURL=index.js.map