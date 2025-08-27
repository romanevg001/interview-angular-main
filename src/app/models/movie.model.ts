import { BaseModel } from "./base.model";

export interface IMovie {
    id: string;
    name: string;
    isOnline: boolean;
    _isEdit: boolean;
}

export class Movie extends BaseModel implements IMovie {
    id = String(Math.random()*1000);
    name = '';
    isOnline = false;
    _isEdit = false;

    constructor(o?: any) {
        super();
        super.checkFields(o);
    }
}

