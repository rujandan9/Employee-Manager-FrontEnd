import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeModel } from '../employee.mode';
import { EmployeeService } from '../employee.service';
import { ImageModel } from '../image.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  x : string[]  = ["Sef", "sef mare"]
  searchTerm=""
  selectedFunctie="toate"
  page=1
  pageSize=5
    employeeList : EmployeeModel[]=[]
    listaAngajatiFunctie :EmployeeModel[]=[]
  image = new ImageModel(1,"","","",1);
    newEmployee : EmployeeModel= new EmployeeModel("", "","" ,0, new Date(),new Date(), "", " ")
    closeResult=""
  term: string = ""
  employeeEdit : EmployeeModel  = this.newEmployee
  editID: number= 0;
  editObservatii="";
xy :  BlobPart[]=[];
  imagineBuletin: any = null;
  imaginePermis: any = null;

// image 
selectedFile: File = new File(this.xy, "xx");
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string | undefined;
  imageName: any;
  listRetrievedImages: any[]=[];
  imageType: string = '';
  idAngajatSelectat: number = -1;
  hideShowBuletin = false;
  hideShowPermis = false;


  constructor(private employeeService : EmployeeService,
    private securityS : SecurityService,
    private modalService: NgbModal,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((datas: any ) =>{
      this.employeeList=datas;
      this.listaAngajatiFunctie =datas;
      console.log(datas)
    }, error =>{
      console.log("could not load employees", error);      
    })

    }

    openConfirm(content: any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: "lg"}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    openEdit(content: any, sarac : EmployeeModel) {
      this.idAngajatSelectat =sarac.id;
      this.editID = sarac.id;
      this.employeeEdit = sarac;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: "lg"}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    openAdaugaPoza(content: any, sarac : EmployeeModel) {
      this.editID = sarac.id;
      this.employeeEdit = sarac;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: "lg"}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    
  logout(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  veziBuletin(param: any){

this.hideShowBuletin = !this.hideShowBuletin;
    console.log('vedem buletin pentru: ', param);
    this.employeeService.getImagineForEmployee(param['id'], 'buletin')
      .subscribe(
        rez => {
          console.log('imagine buletin: ', rez);
          this.imagineBuletin = rez;
        },
        err => {
          console.log('could not load image ', err);
        }
      );
  }
   
  veziPermis(param: any){

    this.hideShowPermis = !this.hideShowPermis;
        console.log('vedem buletin pentru: ', param);
        this.employeeService.getImagineForEmployee(param['id'], 'permis')
          .subscribe(
            rez => {
              console.log('imagine permis: ', rez);
              this.imaginePermis = rez;
            },
            err => {
              console.log('could not load image ', err);
            }
          );
      }

    editAngajat(id : number){ 

      // this.employeeEdit.observatii +=    this.editObservatii + " || " ;

      this.employeeService.editEmployee(id , this.employeeEdit).subscribe()
      this.modalService.dismissAll()
      window.location.reload()
    }


    open(content: any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: "lg"}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }

    adaugaAngajat(){
      this.employeeService.addEmployee(this.newEmployee).subscribe()
      window.location.reload()
    }

    deleteAngajat(id:number){
      this.employeeService.deleteEmployee(id).subscribe()
      window.location.reload()
    }

  
    onChangeSelectStatus(event: any) {
      console.log(this.selectedFunctie)
  
      this.employeeList = []
  
      for (let data of this.listaAngajatiFunctie) {
        if (data.functie === this.selectedFunctie) {
          this.employeeList.push(data)
        }
        else if (this.selectedFunctie === "toate") {
          this.employeeList = this.listaAngajatiFunctie;
        }
      }
    }

//Gets called when the user selects an image
public onFileChanged(event : any) {
  //Select File
  this.selectedFile = event.target.files[0];
}


//Gets called when the user clicks on submit to upload the image
onUpload() {
  console.log(this.selectedFile);
  
  //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
  let uploadImageData = new FormData();
  uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

  //Make a call to the Spring Boot Application to save the image
  this.httpClient.post('http://localhost:8080/image/upload/'+this.imageType+'/'+this.idAngajatSelectat, uploadImageData, { observe: 'response' })
    .subscribe((response) => {
      if (response.status > 200 || response.status < 200  ) 
      this.message = 'Image not uploaded successfully'+ response.status;
      else 
        this.message = 'Image uploaded successfully' + response.status;
    
      
    }
    );

   

}

  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
  //Make a call to Sprinf Boot to get the Image Bytes.
  this.httpClient.get('http://localhost:8080/image/get/buletin Dan.jpg' + this.imageName)
    .subscribe(
      res => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = '' + this.base64Data;
      }
    );
}
getALLImages() {
  //Make a call to Sprinf Boot to get the Image Bytes.
  this.httpClient.get('http://localhost:8080/image/get')
    .subscribe(
      res => {
        this.retrieveResonse = res;
        this.base64Data = this.retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      }
    );
}

redirect(){
  this.router.navigate(['images']);   
}
}
