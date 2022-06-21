import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Bonista } from '../entities/bonista-entity';
import { ServiceConfiguration } from './service-configuration';

@Injectable({
  providedIn: 'root',
})
export class BonistaService {
  private baseURL = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response' as 'body',
  };

  constructor( private http: HttpClient, private serviceConfiguration: ServiceConfiguration) {
    this.baseURL = serviceConfiguration.baseUrl + "/bonista";
  }



  getUserByEmail(email: string, token: string) {
    let params = new URLSearchParams();
    params.append('email', email);

    let tempHttpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        Authorization: token,
      }),
      search: params,
    };

    return this.http
      .get<Bonista>(`${this.baseURL}`, tempHttpOptions)
      .pipe(retry(2), catchError(this.serviceConfiguration.handleError));
  }

  updateUser(item: any): Observable<any> {
    return this.http.put<Bonista>(`${this.baseURL}`, JSON.stringify(item), this.serviceConfiguration.httpOptions)
  }

  postUser(item: any): Observable<Bonista> {
    return this.http.post<Bonista>(`${this.baseURL}/signup`, JSON.stringify(item), this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.serviceConfiguration.handleError));
  }
}
