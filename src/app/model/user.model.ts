import { Time } from '@angular/common';

export  class  User {

    id: number;
    
    name: string;
    
    email: string;
    
    uid: string;
    
    user_code: number;

    qr_location: string;

    created_at: Time;

    updated_at: Time;
    
    constructor(values: Object = {}) {
    
    Object.assign(this, values);
    
    }
    
}