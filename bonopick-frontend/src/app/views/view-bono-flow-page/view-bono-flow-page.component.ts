import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Bono, bonoDbtoBono} from "../../entities/bono-entity";
import {BonoService} from "../../services/bono.service";
import {newArray} from "@angular/compiler/src/util";
import {BonoDbEntity} from "../../entities/bono-db-entity";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-view-bono-flow-page',
  templateUrl: './view-bono-flow-page.component.html',
  styleUrls: ['./view-bono-flow-page.component.css']
})

export class ViewBonoFlowPageComponent implements OnInit {

  ELEMENT_DATA: any;

  displayedColumns: string[] = ['position', 'fecha_programada', 'inflacion_periodo', 'plazo_gracia', 'bono', 'bono_indexado','cupon','cuota','amortizacion','prima','escudo','flujo_emisor','flujo_emisor_escudo','flujo_bonista'];

  dataSource: any;

  bonoData: any;

  bonoId: any;

  constructor(private bonoService: BonoService, private route: ActivatedRoute, private sessionService: SessionService) {
    this.sessionService.validateLogin();
    this.route.params.subscribe(params => {
      this.bonoId = params['id']
      bonoService.getBonoById(this.bonoId).subscribe(data => {

        this.bonoData = bonoDbtoBono(data);

        let f_e = new Date(2022, 5, 1) //DATO

        //CASO 1
        //print("CASO 1 \n")
        let l_i_anual = this.bonoData.LInflacionAnual //DATO - 1 por Año
        this.flujo_caja(this.bonoData.MValorNominal, this.bonoData.MValorComercial, this.bonoData.QAniosPago, this.bonoData.NPeriodoFrecuenciaCuponTipo, this.bonoData.QDias, this.bonoData.TipoTasaIsEfectiva, this.bonoData.NPeriodoCapitalTNTipo, this.bonoData.PerTasaInteres, this.bonoData.PerTasaAnualDescuento, this.bonoData.PerImportRenta, new Date(this.bonoData.DEmision), this.bonoData.PerPrima, this.bonoData.PerEstructuracion, this.bonoData.PerColocacion, this.bonoData.PerFlotacion,this.bonoData.PerCavali, this.bonoData.QPeriodosGracia, l_i_anual)
        this.dataSource = this.ELEMENT_DATA;
      })

    });
  }

  ngOnInit(): void {
  }

  flujo_caja(MValorNominal: any, MValorComercial: any, QAniosPago: any, NPeriodoFrecuenciaCuponTipo: any, QDias: any, TipoTasaIsEfectiva: any, NPeriodoCapitalTNTipo: any, PerTasaInteres: any, PerTasaAnualDescuento: any, PerImportRenta: any, DEmision: any, PerPrima: any, PerEstructuracion: any, PerColocacion: any, PerFlotacion: any, PerCavali: any, QPeriodosGracia: any, LInflacionAnual: any) {

    let COK_periodo, NPeriodoFrecuenciaCupon, c_i_a, c_r_i, capitalizacion, costes_i_bonista, costes_i_emisor, n_periodos_year, n_total_periodos, rango_inflacion, tasa_anual, tasa_periodo;
    NPeriodoFrecuenciaCupon = 30;

    if (NPeriodoFrecuenciaCuponTipo === 0) {
      NPeriodoFrecuenciaCupon = 30;
    } else {
      if (NPeriodoFrecuenciaCuponTipo === 1) {
        NPeriodoFrecuenciaCupon = 60;
      } else {
        if (NPeriodoFrecuenciaCuponTipo === 2) {
          NPeriodoFrecuenciaCupon = 90;
        } else {
          if (NPeriodoFrecuenciaCuponTipo === 3) {
            NPeriodoFrecuenciaCupon = 120;
          } else {
            if (NPeriodoFrecuenciaCuponTipo === 4) {
              NPeriodoFrecuenciaCupon = 180;
            } else {
              if (NPeriodoFrecuenciaCuponTipo === 5) {
                NPeriodoFrecuenciaCupon = 360;
              }
            }
          }
        }
      }
    }

    capitalizacion = 1;

    if (NPeriodoCapitalTNTipo === 0) {
      capitalizacion = 1;
    } else {
      if (NPeriodoCapitalTNTipo === 1) {
        capitalizacion = 15;
      } else {
        if (NPeriodoCapitalTNTipo === 2) {
          capitalizacion = 30;
        } else {
          if (NPeriodoCapitalTNTipo === 3) {
            capitalizacion = 60;
          } else {
            if (NPeriodoCapitalTNTipo === 4) {
              capitalizacion = 90;
            } else {
              if (NPeriodoCapitalTNTipo === 5) {
                capitalizacion = 120;
              } else {
                if (NPeriodoCapitalTNTipo === 6) {
                  capitalizacion = 180;
                } else {
                  if (NPeriodoCapitalTNTipo === 7) {
                    capitalizacion = 360;
                  }
                }
              }
            }
          }
        }
      }
    }

    if (TipoTasaIsEfectiva) {
      tasa_anual = PerTasaInteres;
    } else {
      tasa_anual = Math.pow(1 + PerTasaInteres / (QDias / capitalizacion), QDias / capitalizacion) - 1;
    }

    tasa_periodo = Math.pow(1 + tasa_anual, NPeriodoFrecuenciaCupon / QDias) - 1;
    COK_periodo = Math.pow(1 + PerTasaAnualDescuento, NPeriodoFrecuenciaCupon / QDias) - 1;
    n_periodos_year = QDias / NPeriodoFrecuenciaCupon;
    n_total_periodos = n_periodos_year * QAniosPago;
    costes_i_emisor = (PerEstructuracion + PerColocacion + PerFlotacion + PerCavali) * MValorComercial;
    costes_i_bonista = (PerFlotacion + PerCavali) * MValorComercial;

    let l_fecha_programada= new Array<any>(n_total_periodos + 1);


    for (let i=0; i<l_fecha_programada.length;i++){
      let temp = new Date(DEmision);
      temp.setDate(temp.getDate() + NPeriodoFrecuenciaCupon*i)
      l_fecha_programada[i]= temp.toISOString().slice(0,10);
    }

    let lbono = new Array<any>(n_total_periodos + 1);
    let lbono_index= new Array<any>(n_total_periodos + 1);
    let lcupon_interes= new Array<any>(n_total_periodos + 1);
    let lamortizacion= new Array<any>(n_total_periodos + 1);
    let lcuota= new Array<any>(n_total_periodos + 1);
    let lprima= new Array<any>(n_total_periodos + 1);
    let lescudo= new Array<any>(n_total_periodos + 1);
    let l_flujo_emisor= new Array<any>(n_total_periodos + 1);
    let l_flujo_emisor_escudo= new Array<any>(n_total_periodos + 1);
    let l_flujo_bonista= new Array<any>(n_total_periodos + 1);
    let l_plazo_gracia= new Array<any>(n_total_periodos + 1);

    for (let i=0; i<lbono.length;i++) lbono[i]=0;
    for (let i=0; i<lbono_index.length;i++) lbono_index[i]=0;
    for (let i=0; i<lcupon_interes.length;i++) lcupon_interes[i]=0;
    for (let i=0; i<lamortizacion.length;i++) lamortizacion[i]=0;
    for (let i=0; i<lcuota.length;i++) lcuota[i]=0;
    for (let i=0; i<lprima.length;i++) lprima[i]=0;
    for (let i=0; i<lescudo.length;i++) lescudo[i]=0;
    for (let i=0; i<l_flujo_emisor.length;i++) l_flujo_emisor[i]=0;
    for (let i=0; i<l_flujo_emisor_escudo.length;i++) l_flujo_emisor_escudo[i]=0;
    for (let i=0; i<l_flujo_bonista.length;i++) l_flujo_bonista[i]=0;
    for (let i=0; i<l_plazo_gracia.length;i++) l_plazo_gracia[i]='S';

    for (var i = 0; i < l_plazo_gracia.length; i += 1) {
      if (i > 0 && i <= QPeriodosGracia) {
        l_plazo_gracia[i] = "T";
      }
    }

    let l_flujo_actual= new Array<any>(n_total_periodos + 1);
    let l_flujo_a_x_p= new Array<any>(n_total_periodos + 1);
    let l_factor_convex= new Array<any>(n_total_periodos + 1);
    let l_inflacion_anual_f= new Array<any>(n_total_periodos + 1);

    for (let i=0; i<l_flujo_actual.length;i++) l_flujo_actual[i]=0;
    for (let i=0; i<l_flujo_a_x_p.length;i++) l_flujo_a_x_p[i]=0;
    for (let i=0; i<l_factor_convex.length;i++) l_factor_convex[i]=0;
    for (let i=0; i<l_inflacion_anual_f.length;i++) l_inflacion_anual_f[i]=0;

    rango_inflacion = QDias / NPeriodoFrecuenciaCupon;
    c_r_i = 0;
    c_i_a = 0;

    let l_inflacion_periodo= new Array<any>(n_total_periodos + 1);

    for (let i=0; i<l_inflacion_periodo.length;i++) l_inflacion_periodo[i]=0;

    for (var i = 0, _pj_a = lbono.length; i < _pj_a; i += 1) {
      if (i === 0) {
        l_flujo_emisor[i] = MValorComercial - costes_i_emisor;
        l_flujo_emisor_escudo[i] = MValorComercial - costes_i_emisor;
        l_flujo_bonista[i] = -MValorComercial - costes_i_bonista;
      } else {
        if (i === 1) {
          lbono[i] = MValorNominal;
        }
      }

      if (i > 1) {
        if (l_plazo_gracia[i - 1] === "T") {
          lbono[i] = lbono_index[i - 1] - lcupon_interes[i - 1];
        } else {
          lbono[i] = lbono_index[i - 1] + lamortizacion[i - 1];
        }
      }

      if (i > 0) {
        if (c_r_i < rango_inflacion - 1) {
          l_inflacion_anual_f[i] = LInflacionAnual[c_i_a];
          l_inflacion_periodo[i] = Math.pow(1 + l_inflacion_anual_f[i], NPeriodoFrecuenciaCupon / QDias) - 1;
          c_r_i += 1;
        } else {
          l_inflacion_anual_f[i] = LInflacionAnual[c_i_a];
          l_inflacion_periodo[i] = Math.pow(1 + l_inflacion_anual_f[i], NPeriodoFrecuenciaCupon / QDias) - 1;
          c_r_i = 0;
          c_i_a += 1;
        }
      }

      lbono_index[i] = lbono[i] * (1 + l_inflacion_periodo[i]);
      lcupon_interes[i] = -lbono_index[i] * tasa_periodo;

      if (i < lbono.length - 1) {
        lamortizacion[i] = 0;
      } else {
        lamortizacion[i] = -lbono_index[i];
      }

      if (i < lbono.length) {
        if (l_plazo_gracia[i] === "T") {
          lcuota[i] = 0;
        } else {
          lcuota[i] = lcupon_interes[i] + lamortizacion[i];
        }
      }

      if (i === lbono.length - 1) {
        lprima[i] = -(MValorNominal * PerPrima);
      }

      if (i > 0) {
        lescudo[i] = -lcupon_interes[i] * PerImportRenta;
        l_flujo_emisor[i] = lcuota[i] + lprima[i];
        l_flujo_emisor_escudo[i] = l_flujo_emisor[i] + lescudo[i];
        l_flujo_bonista[i] = -l_flujo_emisor[i];
        l_flujo_actual[i] = l_flujo_bonista[i] / Math.pow(1 + COK_periodo, i);
        l_flujo_a_x_p[i] = l_flujo_actual[i] * i * (NPeriodoFrecuenciaCupon / QDias);
        l_factor_convex[i] = l_flujo_actual[i] * i * (1 + i);
      }
    }

    this.ELEMENT_DATA = this.arrays_to_matrix(l_fecha_programada,l_inflacion_periodo,l_plazo_gracia,lbono, lbono_index, lcupon_interes,lcuota,lamortizacion,lprima,lescudo,l_flujo_emisor,l_flujo_emisor_escudo,l_flujo_bonista,l_flujo_actual,l_flujo_a_x_p,l_factor_convex )

  }

  arrays_to_matrix(l1: any, l2: any,l3: any,l4: any,l5: any,l6: any,l7: any,l8: any,l9: any,l10: any,l11: any,l12: any,l13: any,l14: any,l15: any,l16: any){
    let l0= new Array<any>(l1.length);
    for (let i=0; i<l0.length;i++) l0[i]=i;

    let lr= new Array<any>();

    for (let i=0; i<l0.length;i++){
      if(i===0) lr.push({position: l0[i], fecha_programada: l1[i], inflacion_periodo: '', plazo_gracia: '', bono: '', bono_indexado: '', cupon: '', cuota: '', amortizacion: '', prima: '', escudo: '', flujo_emisor: l11[i].toFixed(2), flujo_emisor_escudo: l12[i].toFixed(2),flujo_bonista: l13[i].toFixed(2), flujo_actual: '', flujo_actual_plazo: '',factor_convexidad: ''})
      else lr.push({position: l0[i], fecha_programada: l1[i], inflacion_periodo: (l2[i]*100).toFixed(3)+'%', plazo_gracia: l3[i], bono: l4[i].toFixed(2), bono_indexado: l5[i].toFixed(2), cupon: l6[i].toFixed(2), cuota: l7[i].toFixed(2), amortizacion: l8[i].toFixed(2), prima: l9[i].toFixed(2), escudo: l10[i].toFixed(2), flujo_emisor: l11[i].toFixed(2), flujo_emisor_escudo: l12[i].toFixed(2),flujo_bonista: l13[i].toFixed(2), flujo_actual: l14[i].toFixed(2), flujo_actual_plazo: l15[i].toFixed(2),factor_convexidad: l16[i].toFixed(2)})
    }

    return lr;
  }

}



