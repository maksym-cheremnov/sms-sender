export interface UseCase {
    execute: (data?: any, ...arg: any) => any;
}