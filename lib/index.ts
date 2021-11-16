import dotenv from "dotenv";
import http from "http";
import express from "express";
import { makeExpressCallback } from "./expressCallback";
import { sendSms } from "./controllers";

dotenv.config();

const apiRoot = process.env.API_ROOT;
const app = express();

app.use(express.json());
app.use(express.raw());
app.use(express.urlencoded({ extended: false }));
app.set("port", process.env.PORT);
app.set("env", process.env.NODE_ENV);
app.disable("x-powered-by");

app.post(`${apiRoot}/send-sms`, makeExpressCallback(sendSms));

const server = http.createServer(app);

server.listen(app.get("port"), () => {
    console.info(`API listening on port ${app.get("port")}`);
});

server.on("error", error => {
    console.error(error);
});