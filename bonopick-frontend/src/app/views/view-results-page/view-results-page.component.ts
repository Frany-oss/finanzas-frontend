import { Component, OnInit } from '@angular/core';
import {BonoService} from "../../services/bono.service";
import {ActivatedRoute} from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-results-page',
  templateUrl: './view-results-page.component.html',
  styleUrls: ['./view-results-page.component.css']
})
export class ViewResultsPageComponent implements OnInit {

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  bonoId: any
  bonoData: any
  isEfectiva: Boolean = false

  precio_actual: any;
  utilidad_perdida: any;
  frecuencia_cupon: any;
  dias_capitalizacion: any;
  periodos_anual: any;
  total_periodos: any;
  tasa_anual: any;
  tasa_periodo: any;
  cok_periodo: any;
  costes_iniciales_emisor: any;
  costes_iniciales_bonista: any;
  duracion: any;
  convexidad: any;
  total: any;
  duracion_modificada: any;
  tcea_emisor: any;
  tcea_emisor_escudo: any;
  trea_bonista: any;

  constructor(private bonoService: BonoService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.bonoId = params['id']
      bonoService.getBonoById(this.bonoId).subscribe(data => {
        this.bonoData = data;
        let f_e = new Date(2022, 5, 1) //DATO

        //CASO 1
        //print("CASO 1 \n")
        let l_i_anual = this.bonoData.LInflacionAnual //DATO - 1 por Año
        this.flujo_caja(this.bonoData.MValorNominal, this.bonoData.MValorComercial, this.bonoData.QAniosPago, this.bonoData.NPeriodoFrecuenciaCuponTipo, this.bonoData.QDias, this.bonoData.TipoTasaIsEfectiva, this.bonoData.NPeriodoCapitalTNTipo, this.bonoData.PerTasaInteres, this.bonoData.PerTasaAnualDescuento, this.bonoData.PerImportRenta, new Date(this.bonoData.DEmision), this.bonoData.PerPrima, this.bonoData.PerEstructuracion, this.bonoData.PerColocacion, this.bonoData.PerFlotacion,this.bonoData.PerCavali, this.bonoData.QPeriodosGracia, l_i_anual)
      })
    });
  }

  ngOnInit(): void {

  }

  TIR(l: any) {
    let res, t, x;
    res = 1;
    x = 0;
    t = 0;

    while (res > 0) {
      res = l[0];

      if (res < 0) {
        for (let i = 0, _pj_a = l.length; i < _pj_a; i += 1) {
          if (i > 0) {
            res += l[i] / Math.pow(1 + x, i);
          }
        }
      } else {
        res = -res;

        for (let i = 0, _pj_a = l.length; i < _pj_a; i += 1) {
          if (i > 0) {
            res -= l[i] / Math.pow(1 + x, i);
          }
        }
      }

      if (res > 1000) {
        x += 0.001;
      } else {
        if (res > 100) {
          x += 0.0001;
        } else {
          if (res > 10) {
            x += 1e-05;
          } else {
            if (res > 1) {
              x += 1e-06;
            } else {
              if (res > 0.5) {
                x += 1e-07;
              } else {
                if (res > 0.1) {
                  x += 1e-08;
                } else {
                  if (res > 0.01) {
                    x += 1e-09;
                  } else {
                    if (res > 0.001) {
                      x += 1e-10;
                    } else {
                      if (res > 0.0001) {
                        x += 1e-11;
                      } else {
                        x += 1e-12;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return x;
  }

  VP(l: any, rate: any) {
    let r;
    r = 0;

    for (let i = 0, _pj_a = l.length; i < _pj_a; i += 1) {
      if (i > 0) {
        r += l[i] / Math.pow(1 + rate, i);
      }
    }

    return r;
  }

  VNA(l: any, rate: any) {
    let r, vpt;
    vpt = this.VP(l, rate);
    r = vpt + l[0];
    return r;
  }

  d_modificada(d: any, rate: any) {
    let r;
    r = d / (1 + rate);
    return r;
  }

  f_duracion(faxp: any, fa: any) {
    let r, t1, t2;
    t1 = 0;
    t2 = 0;

    for (let i, _pj_c = 0, _pj_a = faxp, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      i = _pj_a[_pj_c];
      t1 += i;
    }

    for (let i, _pj_c = 0, _pj_a = fa, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      i = _pj_a[_pj_c];
      t2 += i;
    }

    r = t1 / t2;
    return r;
  }

  convex(lfa: any, lfc: any, rate:any, dp:any, da:any) {
    let r, t1, t2;
    t1 = 0;
    t2 = 0;

    for (var i, _pj_c = 0, _pj_a = lfa, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      i = _pj_a[_pj_c];
      t1 += i;
    }

    for (let i, _pj_c = 0, _pj_a = lfc, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      i = _pj_a[_pj_c];
      t2 += i;
    }

    r = t2 / (Math.pow(1 + rate, 2) * t1 * Math.pow(da / dp, 2));
    return r;
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


    this.precio_actual = this.VP(l_flujo_bonista, COK_periodo).toFixed(2)
    this.utilidad_perdida = this.VNA(l_flujo_bonista, COK_periodo).toFixed(2)

    this.frecuencia_cupon = NPeriodoFrecuenciaCupon
    if (!TipoTasaIsEfectiva) this.dias_capitalizacion = capitalizacion
    this.periodos_anual = n_periodos_year
    this.total_periodos = n_total_periodos

    this.tasa_anual = (tasa_anual*100).toFixed(7)
    this.tasa_periodo = (tasa_periodo*100).toFixed(7)
    this.cok_periodo = (COK_periodo*100).toFixed(7)
    this.costes_iniciales_emisor = costes_i_emisor
    this.costes_iniciales_bonista = costes_i_bonista

    let d = this.f_duracion(l_flujo_a_x_p, l_flujo_actual)
    let c = this.convex(l_flujo_actual, l_factor_convex, COK_periodo, NPeriodoFrecuenciaCupon, QDias)

    this.duracion = d.toFixed(2)
    this.convexidad = c.toFixed(2)
    this.total = (c+d).toFixed(2)
    this.duracion_modificada = this.d_modificada(d, COK_periodo).toFixed(2)

    let TCEA_E = Math.pow((this.TIR(l_flujo_emisor)+1), QDias/NPeriodoFrecuenciaCupon) - 1
    let TCEA_E_esc = Math.pow((this.TIR(l_flujo_emisor_escudo)+1), QDias/NPeriodoFrecuenciaCupon) - 1
    let TREA_B = Math.pow((this.TIR(l_flujo_bonista)+1), QDias/NPeriodoFrecuenciaCupon) - 1

    this.tcea_emisor = (TCEA_E*100).toFixed(7)
    this.tcea_emisor_escudo = (TCEA_E_esc*100).toFixed(7)
    this.trea_bonista = (TREA_B*100).toFixed(7)

  }


}
