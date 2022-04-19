export class ImageModel{
    id : number;
    name : String ;
    type : String ;
    picByte : any;
    employee_id : number;
    imageType?: string;


    constructor(id : number, name :String, type :String, picByte: any, employee_id :number){
        this.id =id;
        this.name=name;
        this.picByte = picByte;
        this.type = type;
        this.employee_id= employee_id;
    }
}