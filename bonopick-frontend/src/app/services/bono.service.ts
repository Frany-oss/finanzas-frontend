import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Bono} from "../entities/bono-entity";
import {ServiceConfiguration} from "./service-configuration";
import {BonoDbEntity} from "../entities/bono-db-entity";

@Injectable({
  providedIn: 'root'
})
export class BonoService {

  private baseURL = "";

  constructor(private http: HttpClient, private serviceConfiguration: ServiceConfiguration) {
    this.baseURL = serviceConfiguration.baseUrl + "/bonos";
  }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError('Something happened with request, please try again later');
  }

  getBonoById(id: number): Observable<BonoDbEntity> {

    return this.http.get<BonoDbEntity>(`${this.baseURL}/id/${id}`, this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));

  }

  postBono(item: any): Observable<BonoDbEntity> {
    return this.http.post<BonoDbEntity>(`${this.baseURL}`, JSON.stringify(item), this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getBonos(): Observable<BonoDbEntity[]> {

    return this.http.get<BonoDbEntity[]>(`${this.baseURL}/bonista/id/1`, this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
