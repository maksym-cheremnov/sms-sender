import { inject, injectable } from "inversify";
import 'reflect-metadata';
import { HttpRequest, HttpResponse, StatusCode, Controller } from "httpController.types";
import { TYPES } from "../../lib/IoC/types";
import { UseCase } from "useCase.types";
import { AppError } from "../errors/appError";
import { CommonErrors } from "../errors/errorCodes";

@injectable()
export class SendSMSController implements Controller {

  @inject(TYPES.SendSMS) private _useCase: UseCase;

  async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const result = await this._useCase.execute(httpRequest.body);

      if (result instanceof AppError) {
        let statusCode: StatusCode = 400;

        return {
          headers: {
            "Content-Type": "application/json"
          },
          body: {
            error: {
              msg: result.message,
              errCode: result.errorCode
            },
            result: null,
            timestamp: new Date().toISOString()
          },
          statusCode: statusCode
        };
      }
      return {
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          error: null,
          result: result,
          timestamp: new Date().toISOString()
        },
        statusCode: 200
      };
    } catch (err) {
      console.error(err);

      return {
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          error: {
            msg: "Internal Server Error.",
            errCode: CommonErrors.INTERNAL_ERR
          },
          timestamp: new Date().toISOString(),
          result: null
        },
        statusCode: 500
      };
    }
  }
}