import { Container } from "inversify";
import { TYPES } from "./types";
import { SMSService } from "../types/services.types";
import { SMSSender } from "../services/smsService";
import { Controller } from "httpController.types";
import { UseCase } from "useCase.types";
import {SendSMS} from "../useCase/sendSms";
import {SendSMSController} from "../controllers/sendSms";

const appContainer = new Container();

appContainer.bind<SMSService>(TYPES.SMSService).to(SMSSender);
appContainer.bind<Controller>(TYPES.SendSMSController).to(SendSMSController);
appContainer.bind<UseCase>(TYPES.SendSMS).to(SendSMS);

export {appContainer};