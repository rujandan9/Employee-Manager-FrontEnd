import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {


  private SERVER_PATH : string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }


  urlAT() {
    return '?access_token=' + localStorage.getItem("access_token");
  }


  obtainAccessToken(username: string, password: string): Observable<Object> {
    // let params = new URLSearchParams();
    const params2 = {
      username: username,
      password: password,
      grant_type: 'password',
      client_id: 'my-client'
    };

    let headers =
      new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa("my-client:my-secret")
      });
    const options = {
      headers: headers,
      params: params2
    }



    return this.httpClient.post(`${this.SERVER_PATH}/oauth/token`, params2, options);
    // .map(res => res.json())
    // .subscribe(
    //   data => this.saveToken(data),
    //   err => alert('Invalid Credentials')); 
  }

  saveToken(token: any) {
    // var expireDate = new Date().getTime() + (1000 * token.expires_in);
    // Cookie.set("access_token", token.access_token, expireDate);
    localStorage.setItem("access_token", token.access_token);
    // this.storageService.store("access_token", token.access_token);
    // this._router.navigate(['/']);
  }


  configureHeaderOptionsForOAuthPOST() {
    let headers =
      new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      });
    const options = {
      headers: headers
    }
    return options;
  }

  configureHeaderOptionsForOAuth() {
    let headers =
      new HttpHeaders({
        // 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
      });
    const options = {
      headers: headers
    }
    return options;
  }

  whoAmI() {
    // let token = localStorage.getItem("access_token");

    // let optionsRequest = new RequestOptions({headers: headers});

    return this.httpClient.get<string>(`${this.SERVER_PATH}/rest/users/whoami`, this.configureHeaderOptionsForOAuth());
  }

  register(usernameRegister: string, passwordRegister: string, emailRegister: string) : Observable<Object> {
    let object = {
      "username": usernameRegister,
      "password": passwordRegister,
      "email": emailRegister
    }
    let headers =
      new HttpHeaders({
        // 'Content-type': 'application/json',
        'Authorization': 'Basic ' + btoa("my-client:my-secret")
      });
    const options = {
      headers: headers
    }
    return this.httpClient.post<any>(`${this.SERVER_PATH}/security/users/register`, object); //  object, options
  }

  login(username: string, password: string): Observable<Object> {
    return this.obtainAccessToken(username, password);


  }

  getLoggedInUser() {
    console.log('getting logged in user')
    let loggedInUser = {
      access_token: localStorage.getItem('access_token'),
      user_id: localStorage.getItem('user_id')
    };
    return loggedInUser;
  }
}
