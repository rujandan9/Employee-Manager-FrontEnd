import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesComponent } from './employees/employees.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { NgSearchPipe } from 'ng-search-pipe';
import { SearchFilterPipe } from './search-filter.pipe';
import { LoginComponent } from './login/login.component';
import { ImagesComponent } from './images/images.component';
import { SearchImage } from './searchImages.pipe';
@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    SearchFilterPipe,
    SearchImage,
    LoginComponent,
    ImagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    Ng2SearchPipeModule,

    NgSearchPipe 
  
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
