import { EmployeeModel } from "./employee.mode";

export class Image2Model{
    id : number;
    name : String ;
    type : String ;
    picByte : any;
    employee : EmployeeModel;
    imageType?: string;


    constructor(id : number, name :String, type :String, picByte: any, employee :EmployeeModel){
        this.id =id;
        this.name=name;
        this.picByte = picByte;
        this.type = type;
        this.employee= employee;
    }
}