import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, finalize } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class LabService {

  constructor(private http: HttpClient) { }

  public getObjects(objectdae_id: string) {
      return this.http.get("http://djewelry.azurewebsites.net/api/Object/" + objectdae_id).pipe(map((res: Response) => res));
  }
  
}