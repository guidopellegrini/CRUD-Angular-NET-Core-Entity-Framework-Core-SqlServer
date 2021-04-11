import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  myAppUrl = 'https://localhost:44362/'
  myApiUrl = 'api/tarjeta/'

  constructor(private http: HttpClient) { }

  getListTarjetas(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
}
