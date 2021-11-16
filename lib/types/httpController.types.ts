import { ErrorCodes } from "../errors/errorCodes";

export interface Controller {
    execute: (httpRequest: HttpRequest) => Promise<HttpResponse>;
  }
  
  export interface HttpRequest {
    body: any;
    query: any;
    params: any;
    ip: string;
    method: "POST" | "PUT" | "GET" | "PATCH" | "DELETE" | string; // string used because express req.method narrowed to string
    path: string;
    headers: Partial<HttpHeaders>;
  }
  
  export interface HttpHeaders {
    "Content-Type": string;
    Referer: string;
    "User-Agent": string;
    "Authorization": string;
  }

  export type StatusCode = 200 | 400| 500;

  export interface HttpResponse {
    headers: Partial<HttpHeaders>;
    body: HttpResponseBody;
    statusCode: StatusCode;
    callNext?: boolean;
  }
  
  export interface HttpResponseBody {
    error: null | HttpError;
    result: any;
    timestamp: string;
  }

  export interface HttpError {
    msg: string;
    errCode: ErrorCodes;
  }
  