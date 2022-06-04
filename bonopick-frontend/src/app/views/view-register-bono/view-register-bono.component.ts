import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {
  RegisterAnualInflationDialogComponent
} from "../../components/register-anual-inflation-dialog/register-anual-inflation-dialog.component";
import {Bono} from "../../entities/bono-entity";
import {newArray} from "@angular/compiler/src/util";
import {BonoService} from "../../services/bono.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BonoDbEntity, bonoToBonoDb} from "../../entities/bono-db-entity";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-view-register-bono',
  templateUrl: './view-register-bono.component.html',
  styleUrls: ['./view-register-bono.component.css']
})
export class ViewRegisterBonoComponent implements OnInit {

  cant_a: number | any
  pag: number | any
  validator: boolean = false

  bonoData: Bono | any

  window:any

  bonoForm: FormGroup | any
  breakpoint: number;

  bonoName: any = ''

  testData: any



  constructor(public dialog: MatDialog, private _bonoService: BonoService,private _router: Router,private route: ActivatedRoute, public datepipe: DatePipe) {

    this.route.params.subscribe(params => {
      this.bonoName = params['name']
    });

    this.breakpoint=0;
    this.cant_a = 10
    this.pag = 1
    this.bonoData = {
      Nombre: '',
      DEmision: '',
      LInflacionAnual: '',
      MValorComercial: '',
      NPeriodoCapitalTNTipo: 0,
      NPeriodoFrecuenciaCuponTipo: 0,
      PerCavali: '',
      PerColocacion: '',
      PerEstructuracion: '',
      PerFlotacion: '',
      PerImportRenta: '',
      PerPrima: '',
      PerTasaAnualDescuento: '',
      PerTasaInteres: '',
      QAniosPago: '',
      QDias: '',
      QPeriodosGracia: '',
      TipoTasaIsEfectiva: false,
    }

  }


  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 1120) ? 1 : 2;

   this.bonoForm =  new FormGroup({
/*      Nombre: new FormControl('', [Validators.required]),*/
      DEmision: new FormControl('', [Validators.required]),
      MValorNominal: new FormControl('', [Validators.required,Validators.min(0)]),
      MValorComercial: new FormControl('', [Validators.required,Validators.min(0)]),
      NPeriodoCapitalTNTipo: new FormControl('', [Validators.required]),
      NPeriodoFrecuenciaCuponTipo: new FormControl('',[Validators.required]),
      PerCavali: new FormControl('', [Validators.required,Validators.min(0)]),
      PerColocacion: new FormControl('',[Validators.required,Validators.min(0)]),
      PerEstructuracion: new FormControl('', [Validators.required,Validators.min(0)]),
      PerFlotacion: new FormControl('',[Validators.required,Validators.min(0)]),
      PerImportRenta: new FormControl('', [Validators.required,Validators.min(0)]),
      PerPrima: new FormControl('',[Validators.required,Validators.min(0)]),
      PerTasaAnualDescuento: new FormControl('', [Validators.required,Validators.min(0.1)]),
      PerTasaInteres: new FormControl('',[Validators.required,Validators.min(0.1)]),
      QAniosPago: new FormControl('',[Validators.required, Validators.min(1)]),
      QDias: new FormControl('',[Validators.required]),
      QPeriodosGracia: new FormControl('',[Validators.required, Validators.min(0)]),
      TipoTasaIsEfectiva: new FormControl('',[Validators.required])



    });

    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
  }

  refresh(): void {

  }

  onResize(event :any) {
    this.breakpoint = (event.target.innerWidth <= 1120) ? 1 : 2;
  }


  changePag(n : number){
    this.pag=n
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterAnualInflationDialogComponent, {
      data:{
        c_a: this.bonoData.QAniosPago,
        arr_desc:this.bonoData.LInflacionAnual
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data === undefined){
        console.log(`MAL`);
        if(this.bonoData.LInflacionAnual === [] || this.bonoData.LInflacionAnual.length != this.bonoData.QAniosPago){
          this.bonoData.LInflacionAnual = new Array(this.bonoData.QAniosPago)
          for (let i=0;i < this.bonoData.QAniosPago;i++){
            this.bonoData.LInflacionAnual[i] = 0;
          }
          console.log(`${this.bonoData.LInflacionAnual}`);
        }
      } else{
        console.log(`BIEN`);
        this.bonoData.LInflacionAnual = result.data
        console.log(`${this.bonoData.LInflacionAnual}`);
      }
    });
  }

  postBono(){

    this.bonoData.Nombre = this.bonoName
    this.bonoData.PerColocacion = this.bonoData.PerColocacion / 100
    this.bonoData.PerTasaInteres = this.bonoData.PerTasaInteres / 100
    this.bonoData.PerTasaAnualDescuento = this.bonoData.PerTasaAnualDescuento / 100
    this.bonoData.PerImportRenta = this.bonoData.PerImportRenta / 100
    this.bonoData.PerPrima = this.bonoData.PerPrima / 100
    this.bonoData.PerEstructuracion = this.bonoData.PerEstructuracion / 100
    this.bonoData.PerFlotacion = this.bonoData.PerFlotacion / 100
    this.bonoData.PerCavali = this.bonoData.PerCavali / 100
    this.bonoData.NPeriodoCapitalTNTipo=this.bonoData.NPeriodoCapitalTNTipo as number
    this.bonoData.NPeriodoFrecuenciaCuponTipo=this.bonoData.NPeriodoFrecuenciaCuponTipo as number
    this.bonoData.QDias=this.bonoData.QDias as number
    for (let i=0;i<this.bonoData.LInflacionAnual.length;i++){
      this.bonoData.LInflacionAnual[i]=this.bonoData.LInflacionAnual[i]/100
    }
    this.bonoData.DEmision = this.datepipe.transform(this.bonoData.DEmision, 'yyyy-MM-dd') + "T12:30:00Z";


    let temp: any
    temp = bonoToBonoDb(this.bonoData)

    //MANDAR CORREO DEL USUARIO
    temp.bonistaCorreo = "francesco@gmail.com"
    this.testData = temp
    console.log(temp);
    console.log(this.bonoData);
    console.log(JSON.stringify(temp))

    this._bonoService.postBono(temp).subscribe((response: any) => {
      this._router.navigateByUrl('/view-bono-results/'+response.bonoCorporativoId)
    });

  }



}
