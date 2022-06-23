import { Component, OnInit,ViewChild } from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {SessionService} from "../../services/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})


export class SidenavComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;
  isMobile: any

  constructor(private observer: BreakpointObserver, private sessionService: SessionService, private router: Router) {
    this.isMobile = false
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches){
          this.sidenav.mode = 'side';
          this.sidenav.close().then(r => {});
          this.isMobile=true;

        }else{
          this.sidenav.mode = 'side';
          this.sidenav.open().then(r => {});
          this.isMobile=false;
        }
      })
    })
  }

  logout(){
    this.sessionService.logout()
    window.location.reload();
  }

  validView(){
    if (this.router.url == '/login' || this.router.url == '/signup') {
      return false
    } else return true
  }


}
