import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Session} from "../entities/session-entity";
import { BonistaService } from './bonista.service';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ServiceConfiguration} from "./service-configuration";
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseURL = "";

  private  currentSession : Session = {} as Session;

  private  isLoggedIn : boolean = false;

  constructor(private router: Router, private userService: BonistaService, private http: HttpClient, private serviceConfiguration: ServiceConfiguration) {
    let sessionString = localStorage.getItem("currentSession");
    if (sessionString != null) {
      this.currentSession = JSON.parse(sessionString);
      this.isLoggedIn = true;
    }

    this.baseURL = serviceConfiguration.baseUrl;
  }

  public getCurrentSession() : Session {
    return this.currentSession;
  }

  public getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  logout(): void {
    localStorage.removeItem("currentSession");
    this.isLoggedIn = false;
    this.currentSession = {} as Session;
  }

  async validateLogin() {
    if (!this.currentSession.user) {
      this.router.navigateByUrl('/login');
    }
  }

  async validateSession() {
    if (this.currentSession.user) {
      this.router.navigateByUrl('/home');
    }
  }

  async attemptLogin(item: any): Promise<boolean> {
    localStorage.removeItem("currentSession");
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response' as 'body'
    }

    await this.http.post<any>(`${this.baseURL}/bonista/login`, JSON.stringify(item), httpOptions).toPromise()
    .then(async (response: HttpResponse<any>) => {
      this.currentSession.user = response.body;
/*      let body: String | null = response.headers.get('authorization');*/

/*      if (body != null){
        this.currentSession.token = body.replace("Bearer ", "");
      }*/

      localStorage.setItem("currentSession", JSON.stringify(this.currentSession));
    }
    );

    let newSessionString = localStorage.getItem("currentSession");
    console.log("entree")
    if (newSessionString != null){
      console.log("entree")
      await this.router.navigateByUrl('/profile')
      return true;
    }else{
      return false;
    }
  }
}
