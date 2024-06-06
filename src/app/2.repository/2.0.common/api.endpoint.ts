import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiEndpoint {

    private _congnitoEndpoint: string;

    constructor(){
        this._congnitoEndpoint = environment.cognitoEndpoint;
    }

    authenticationEndpoint = (): string => `${this._congnitoEndpoint}/signin`;

}