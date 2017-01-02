import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { AuthService } from '../auth.service';

@Injectable()
export class AccountService{

  constructor(private authService: AuthService, private http: Http){}

  public getAccountData(){
    let requestOptions = new RequestOptions({ headers: this.authService.getAuthHeaders() });
    return this.http.get('http://localhost:9000/protected/account', requestOptions)
    .map((res)=>res.json());
  }
}
