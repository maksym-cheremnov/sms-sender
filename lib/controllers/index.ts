import { Controller } from 'httpController.types';
import { appContainer } from '../IoC/inversify.config';
import { TYPES } from '../IoC/types';

const sendSms = appContainer.get<Controller>(TYPES.SendSMSController);

export { sendSms }