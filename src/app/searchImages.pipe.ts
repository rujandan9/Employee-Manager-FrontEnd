import { Pipe, PipeTransform } from '@angular/core';
import { Image2Model } from './image2.mode';


@Pipe({
    name: 'searchImage'
  })
  export class SearchImage implements PipeTransform {
  
    transform(employees : Image2Model[] , searchValue : string): Image2Model[] {
    
      if(!employees || !searchValue){
      return employees;
     }
     return employees.filter(employee =>
      employee.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase() ) 
      ||
      employee.type.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase() ) 
      ||
      employee.id.toString().toLocaleLowerCase().includes( searchValue.toLocaleLowerCase() ) 
      ||
      employee.employee.name.toLocaleLowerCase().includes( searchValue.toLocaleLowerCase() ) 
      ||
      employee.employee.prenume.toLocaleLowerCase().includes( searchValue.toLocaleLowerCase() ) 
      ||
      employee.employee.id.toString().toLocaleLowerCase().includes( searchValue.toLocaleLowerCase() ) 
      );
    }
  
  }
  