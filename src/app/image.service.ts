import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageModel } from './image.model';
import { Image2Model } from './image2.mode';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }
  private SERVER_PATH : string = 'http://localhost:8080/image/';

  getAllImages():Observable<Image2Model[]>{

    return this.httpClient.get<Image2Model[]>(this.SERVER_PATH + 'getAllImages');
  }

  deleteImage(id :number){
    return this.httpClient.delete(this.SERVER_PATH  + id );
  }

}
