import { Component, OnInit,ViewChild } from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})


export class SidenavComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;
  isMobile: any

  constructor(private observer: BreakpointObserver) {
    this.isMobile = false
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(){
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
  }


}
