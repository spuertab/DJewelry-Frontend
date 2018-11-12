import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, finalize } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class FactoryService {

  constructor(private http: HttpClient) { }

  public sendInfoEmail(object: any) {
      return this.http.post("https://djewelryfunctions.azurewebsites.net/api/SendEmailDJewelry?code=Xxq2kL2InTVJWrm0tahGr8tRDyzBClJnQiTd77YCCxLu/s7x5yGs9A==", object).pipe(map((res: Response) => res));
  }
} 