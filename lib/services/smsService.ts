import { injectable } from 'inversify';
import 'reflect-metadata';
import twilio from 'twilio';
import { SMSService } from 'services.types';

@injectable()
export class SMSSender implements SMSService {
    private _client: any;
    
    constructor () {
        this._client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async send(message: string, to: string): Promise<void> {
        try {
            await this._client.messages.create({
                body: message,
                messagingServiceSid: process.env.TWILIO_SERVICE_SID,
                to
           });
        } catch (error) {
           console.error(error); 
        }
    }
}




