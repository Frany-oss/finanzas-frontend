import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Bono} from "../entities/bono-entity";
import {ServiceConfiguration} from "./service-configuration";

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

  getBonoById(id: number): Observable<Bono> {

    return this.http.get<Bono>(`${this.baseURL}/${id}`, this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getBonos(): Observable<Bono[]> {

    return this.http.get<Bono[]>(`${this.baseURL}`, this.serviceConfiguration.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
