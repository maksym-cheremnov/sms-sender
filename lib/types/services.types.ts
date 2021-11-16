export interface SMSService {
    send(message: string, to: string): Promise<void>;
  }