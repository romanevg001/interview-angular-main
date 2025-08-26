import { BaseModel } from "./base.model";

export interface IMovie {
    id: string;
    name: string;
    isOnline: boolean;
}

export class Movie extends BaseModel implements IMovie {
    id = String(Math.random()*1000);
    name = '';
    isOnline = false;

    constructor(o?: any) {
        super();
        super.checkFields(o);
    }
}

