import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModel } from '../image.model';
import { ImageService } from '../image.service';
import { Image2Model } from '../image2.mode';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  searchTerm=""

imageList : Image2Model[] =[]
page=1
pageSize=10
  closeResult: string ="";

  selectedId = 0;

  constructor(
    private imageService: ImageService,
    private modalService: NgbModal,
    private router : Router
  ) { }

  ngOnInit(): void {


    this.imageService.getAllImages().subscribe(data => {
      this.imageList = data;
      console.log(data[0].employee.name);
      
    })
  }

  deleteImage(id : number){

    this.imageService.deleteImage(id).subscribe();
    window.location.reload();
  }

  open(content: any, id : number) {
    this.selectedId = id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  redirect(){
    this.router.navigate(['']);   
  }
}
