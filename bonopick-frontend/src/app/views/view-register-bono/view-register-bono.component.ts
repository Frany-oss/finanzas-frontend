import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  RegisterAnualInflationDialogComponent
} from "../../components/register-anual-inflation-dialog/register-anual-inflation-dialog.component";
import {Bono} from "../../entities/bono-entity";
import {newArray} from "@angular/compiler/src/util";
import {BonoService} from "../../services/bono.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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


  bonoForm: FormGroup | any


  constructor(public dialog: MatDialog, private _bonoService: BonoService,private _router: Router) {

    this.cant_a = 10
    this.pag = 1
    this.bonoData = {
      DEmision: '',
      LInflacionAnual: [],
      MValorComercial: '',
      NPeriodoCapitalTNTipo: '',
      NPeriodoFrecuenciaCuponTipo: '',
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
      TipoTasaIsEfectiva: '',
    }
  }

  ngOnInit(): void {
/*    this.bonoForm =  new FormGroup({
      DEmision: new FormControl('', Validators.minLength(2)),
      MValorComercial: new FormControl('', Validators.minLength(2)),
      NPeriodoCapitalTNTipo: new FormControl('', Validators.minLength(2)),
      NPeriodoFrecuenciaCuponTipo: new FormControl(''),
      PerCavali: new FormControl('', Validators.minLength(2)),
      PerColocacion: new FormControl(''),
      PerEstructuracion: new FormControl('', Validators.minLength(2)),
      PerFlotacion: new FormControl(''),
      PerImportRenta: new FormControl('', Validators.minLength(2)),
      PerPrima: new FormControl(''),
      PerTasaAnualDescuento: new FormControl('', Validators.minLength(2)),
      PerTasaInteres: new FormControl(''),
      QAniosPago: new FormControl('', Validators.minLength(2)),
      QDias: new FormControl(''),
      QPeriodosGracia: new FormControl('', Validators.minLength(2)),
      TipoTasaIsEfectiva: new FormControl(''),
    });*/
  }

  changePag(n : number){
    this.pag=n
  }

  openDialog() {
    const dialogRef = this.dialog.open(RegisterAnualInflationDialogComponent, {
      data:{
        c_a: this.bonoData.QAniosPago
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.data === undefined){
        console.log(`MAL`);
        if(this.bonoData.LInflacionAnual == [] || this.bonoData.LInflacionAnual.length != this.bonoData.QAniosPago){
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

    this.bonoData.PerColocacion = this.bonoData.PerColocacion / 100

    this._bonoService.postBono(this.bonoData).subscribe((response: any) => {
      this._router.navigateByUrl('/view-bono-results/'+response.id)
    });

  }

}
