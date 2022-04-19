import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from './employee.mode';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private SERVER_PATH : string = 'http://localhost:8080/rest';

  constructor(private httpClient: HttpClient, private securityService : SecurityService) { }

  getEmployees():Observable<EmployeeModel[]>{
    return this.httpClient.get<EmployeeModel[]>(`${this.SERVER_PATH}/employee`, this.securityService.configureHeaderOptionsForOAuth())
  }

  getImagineForEmployee(empId: number, imageType: string):Observable<any>{
    return this.httpClient.get<any>(`${this.SERVER_PATH}/employee/imagine/${empId}/${imageType}`, this.securityService.configureHeaderOptionsForOAuth())
  }

  addEmployee( data : EmployeeModel ){
    return this.httpClient.post(`${this.SERVER_PATH}/employee`, data, this.securityService.configureHeaderOptionsForOAuth())
  }
  editEmployee(id: number, data: EmployeeModel){
    return this.httpClient.put(`${this.SERVER_PATH}/employee/` + id , data, this.securityService.configureHeaderOptionsForOAuth() )
  }

  deleteEmployee(id: number){
    return this.httpClient.delete(`${this.SERVER_PATH}/employee/` + id, this.securityService.configureHeaderOptionsForOAuth() )
  }
}
