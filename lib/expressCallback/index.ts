import { NextFunction, Request, Response } from "express";
import { HttpRequest, Controller } from "../types/httpController.types";

export function makeExpressCallback(controller: Controller) {
  return (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query || {},
      params: req.params || {},
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
        "Authorization": req.get("Authorization"),
      }
    };

    controller.execute(httpRequest)
      .then(httpResponse => {
        if (httpResponse.callNext) {
          return next();
        }
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch(e => {
        res.status(500).send({ error: "An unkown error occurred." });
        console.error(e);
      });
  };
}