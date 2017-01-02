import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

  private authState: AuthState;
  private clientId: string =  'service';
  private redirectUrl: string =  'http://localhost:8080/auth/realms/master/protocol/openid-connect/auth';
  private requestOptions: RequestOptions = new RequestOptions(
    {
      headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
    }
  );
  private id_token_payload: any;

  constructor(private http: Http){}

  public login(){
    let url = this.redirectUrl +
    "?response_type=id_token+token&scope=openid%20profile" +
    "&client_id=" + encodeURIComponent(this.clientId) +
    "&redirect_uri=" + encodeURIComponent(window.location.origin) +
    "&nonce=" + encodeURIComponent(this.createNonce());
    location.href = url;
  }

  public checkLoginState(){
    let oidcResponse = window.location.hash.substr(1);
    if(!oidcResponse){
      return;
    }
    let oidcParams = oidcResponse.split("&")
    let splitParams: string[]
    let data = <AuthState>{};
    for (var i = 0; i < oidcParams.length; i++) {
      splitParams = oidcParams[i].split("=");
      splitParams[0] = decodeURIComponent(splitParams[0]);
      splitParams[1] = decodeURIComponent(splitParams[1]);
      data[splitParams[0]] = splitParams[1];
    }
    this.authState = data;
    let split_id_token = this.authState.id_token.split('.');
    this.id_token_payload = JSON.parse(atob(split_id_token[1]));
  }

  public logout(){
    this.authState = null;
  }

  public isLoggedIn(): boolean{
    return !!this.authState;
  }

  public getAuthHeaders(): Headers{
    return new Headers({'Authorization': 'Bearer ' + this.authState.access_token})
  }


  public getUserName(): Headers{
    return this.id_token_payload.preferred_username?
    this.id_token_payload.preferred_username : this.id_token_payload.name;
  }

  private createNonce(): string{
    //Nonce Generierung: Statische Demo-Implementierung
    let nonce = Math.floor(Math.random()*1000) + '';
    localStorage.setItem("nonce", nonce);
    return nonce;
  }
}

interface AuthState{
  access_token: string;
  id_token: string;
  expires_in: number;
  token_type: string;
  "not-before-policy": number;
  session_state: string
}
