import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private securityService: SecurityService, private router: Router, private httpClient: HttpClient) { }

  usernameRegister: string = '';
  passwordRegister: string = '';
  emailRegister: string = '';
  username :string = '';
  password : string = '';
  messageLogin : string = '';

  message : string = '';

  // register(usernameRegister: string, passwordRegister: string, emailRegister: string) {
  //   this.securityService.register(usernameRegister, passwordRegister, emailRegister).subscribe(
  //     rez => {
  //       console.log('registered with message: ', rez);
  //       if (rez['STATUS'] == 'OKAY') {
  //         this.message = "Successfully registered, please login";
  //       } else {
  //         this.message = "Registration failed, please try again";
  //       }
  //     },
  //     err => {
  //       console.log('could not register: ', err);
  //       this.message = "Registration failed, please try again";

  //     }
  //   );
  // }

  ngOnInit() {

  }

  login(username : string, password: string) {
   // console.log('Loggin in with: ' + username + ' and ' + password);
    let loginRequest: Observable<Object> = this.securityService.login(username, password);
    loginRequest.subscribe(rez => {
      console.log('authentication result: ', rez);
      this.securityService.saveToken(rez);
  
    this.router.navigate(['']);
      
    },
      err => {
        console.log('unsuccessful login');
        console.log(err);
        this.messageLogin = 'Failure logging in';
      });


  }


}
