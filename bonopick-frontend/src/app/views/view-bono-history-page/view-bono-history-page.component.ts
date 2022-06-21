import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BonoService} from "../../services/bono.service";
import {bonoDbtoBono} from "../../entities/bono-entity";
import {DatePipe} from "@angular/common";
import {SessionService} from "../../services/session.service";
import {MessageBox} from "../../components/message-box-dialog/message-box-dialog.provider";
import {Button, Buttons} from "../../entities/common";

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

const FRUITS: string[] = [
    'blueberry',
    'lychee',
    'kiwi',
    'mango',
    'peach',
    'lime',
    'pomegranate',
    'pineapple',
  ];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'app-view-bono-history-page',
  templateUrl: './view-bono-history-page.component.html',
  styleUrls: ['./view-bono-history-page.component.css']
})

export class ViewBonoHistoryPageComponent implements AfterViewInit  {

  displayedColumns: string[] = ['Nombre', 'id' , 'DEmision', 'view', 'delete'];
  dataSource: MatTableDataSource<any> | any;

  chargeData: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private bonoService: BonoService, public datepipe: DatePipe, private sessionService: SessionService, private mb: MessageBox) {

    this.sessionService.validateLogin();

    let bonoData: any

    bonoService.getBonos().subscribe(data => {
      let temparr: any = data
      bonoData = new Array(temparr.length)
      for (let i =0;i<temparr.length;i++){
        bonoData[i] = bonoDbtoBono(temparr[i])
      }
/*
      bonoData = data;*/
      this.dataSource = new MatTableDataSource(bonoData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.chargeData = false;


    })




    // Assign the data to the data source for the table to render

  }

  deleteBono(id: number){

    let dialog = this.mb.show('Alerta','¿Estas seguro de elimiar este bono?', Buttons.YesNo);

    dialog.dialogResult$.subscribe(result=>{

      if(result == Button.Yes){
        this.bonoService.deleteBono(id).subscribe(data => {
          window.location.reload()
      });

      }
    });
  }

  dateToString(date: any){
    let tempDate = new Date(date)

    return this.datepipe.transform(tempDate, 'yyyy-MM-dd');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


