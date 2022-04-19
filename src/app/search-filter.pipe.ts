import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeModel } from './employee.mode';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(employees : EmployeeModel[] , searchValue : string): EmployeeModel[] {
  
    if(!employees || !searchValue){
    return employees;
   }
   return employees.filter(employee =>
    employee.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase() ) 
    ||
    employee.prenume.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase() ) 
    ||
    employee.id.toString().toLocaleLowerCase().includes( searchValue.toLocaleLowerCase() ) 
    ||
    employee.salariu.toString().toLocaleLowerCase().includes( searchValue.toLocaleLowerCase() ) 
    ||
    employee.telefon.toLocaleLowerCase().includes( searchValue.toLocaleLowerCase() ) 
    ||
    employee.varsta.toString().includes( searchValue.toLocaleLowerCase() ) 
    ||
    employee.functie.toLocaleLowerCase().includes( searchValue.toLocaleLowerCase() ) 
    );
  }

}
