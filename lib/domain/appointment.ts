import { AppError } from './../errors/appError';
import { inject, injectable } from "inversify";
import "reflect-metadata";
import {ActivityEntityBuilder, ActivityEntity, ActivityData } from "entities.types";
import { TYPES } from "../IoC/types";
import { IdService } from "services.types";
import { ActivityCodes } from "../errors/errorCodes";

@injectable()
export class ActivityCreator implements ActivityEntityBuilder {
    @inject(TYPES.IdService) private readonly _idService: IdService;

    restore({ id, csId, startAt, endAt, weekly }: ActivityData) {
        if (!this._idService.isValidId(id)) {
            return new AppError("Id is invalid", ActivityCodes.ACTIVITY_INVALID_DATA);
        }

        if (!this._idService.isValidId(csId)) {
            return new AppError("csId is invalid", ActivityCodes.ACTIVITY_INVALID_DATA);
        }

        if (!(startAt instanceof Date)) {
            return new AppError("startAt should be a valid date", ActivityCodes.ACTIVITY_INVALID_DATA);
        }

        if (!(endAt instanceof Date)) {
            return new AppError("endAt should be a valid date", ActivityCodes.ACTIVITY_INVALID_DATA);
        }

        if (typeof weekly !== "boolean") {
            return new AppError("weekly should be boolean value", ActivityCodes.ACTIVITY_INVALID_DATA);
        }

        if (endAt.getTime() <= startAt.getTime()) {
            return new AppError('endAt can\'t be less than startAt', ActivityCodes.ACTIVITY_INVALID_DATA);
        }

        return new Activity(id, csId, startAt, endAt, weekly);
    }

    create({ csId, startAt, endAt, weekly }: Omit<ActivityData, "id">) {
        if (!this._idService.isValidId(csId)) {
            return new AppError("csId is invalid", ActivityCodes.ACTIVITY_INVALID_DATA);
        }

        if (!(startAt instanceof Date)) {
            return new AppError("startAt should be a valid date", ActivityCodes.ACTIVITY_INVALID_DATA);
        }

        if (!(endAt instanceof Date)) {
            return new AppError("endAt should be a valid date", ActivityCodes.ACTIVITY_INVALID_DATA);
        }

        if (startAt.getTime() < Date.now()) {
            return new AppError('startAt can\'t be in the past', ActivityCodes.ACTIVITY_INVALID_DATA);
        }

        if (endAt.getTime() <= startAt.getTime()) {
            return new AppError('endAt can\'t be less than startAt', ActivityCodes.ACTIVITY_INVALID_DATA);
        }


        if (typeof weekly !== "boolean") {
            return new AppError("weekly should be boolean value", ActivityCodes.ACTIVITY_INVALID_DATA);
        } 

        return new Activity(this._idService.makeId(), csId, startAt, endAt, weekly);
    }
}

class Activity implements ActivityEntity {
    
    constructor(
        private readonly id: string,
        private readonly csId: string,
        private startAt: Date,
        private endAt: Date,
        private readonly weekly: boolean
    ) { }

    getId() {
        return this.id;
    }

    getCsId() {
        return this.csId;
    }

    getStartAt() {
        return this.startAt;
    }

    getEndAt() {
        return this.endAt;
    }

    getWeekly() {
        return this.weekly;
    }

    changeActivity(startAt: Date, endAt: Date) {
        if (!(startAt instanceof Date)) {
            return new AppError('startAt has to be a valid date', ActivityCodes.ACTIVITY_INVALID_DATA);
        }
        
        if (!(endAt instanceof Date)) {
            return new AppError('endAt has to be a valid date', ActivityCodes.ACTIVITY_INVALID_DATA);
        }

        if (startAt.getTime() < Date.now()) {
            return new AppError('startAt can\'t be in the past', ActivityCodes.ACTIVITY_INVALID_DATA);
        }

        if (endAt.getTime() <= startAt.getTime()) {
            return new AppError('endAt can\'t be less than startAt', ActivityCodes.ACTIVITY_INVALID_DATA);
        }

        this.startAt = startAt;
        this.endAt = endAt;
    }

    toObject() {
        return {
            id: this.getId(),
            csId: this.getCsId(),
            startAt: this.getStartAt(),
            endAt: this.getEndAt(),
            weekly: this.getWeekly()
        }
    }
 }
