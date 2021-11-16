import { inject, injectable } from "inversify";
import "reflect-metadata";
import { SMSService } from "services.types";
import { UseCase } from "useCase.types";
import { TYPES } from "../IoC/types";


@injectable()
export class SendSMS implements UseCase {
  @inject(TYPES.SMSService)
  private _smsService: SMSService;

  async execute(data: {text: string; phoneNumber: string}) {
    await this._smsService.send(data.text, data.phoneNumber);
  }
}
