import {Bono} from "./bono-entity";

export interface BonoDbEntity {
  bonoCorporativoId: any,
  nombreCalculoBono: any,
  fechaEmision: any,
  valorNominal: any,
  valorComercial: any,
  aniosPago: any,
  tipoPeriodoFrecuenciaCupon: any,
  numeroDias: any,
  tipoTasaEfectiva: any,
  tipoPeriodoCapitalTn: any,
  perTasaInteres: any,
  perTasaAnualDescuento: any,
  perImportRenta: any,
  perPrima: any,
  perEstructuracion: any,
  perColocacion: any,
  perFlotacion: any,
  perCavali: any,
  periodosGracia: any,
  inflacionAnual: any,
  nombreMoneda: any
  bonistaCorreo: any,
}

export function bonoToBonoDb(bono: Bono): any{
  return {

    nombreCalculoBono: bono.Nombre,

    valorNominal: String(bono.MValorNominal),
    valorComercial: String(bono.MValorComercial),

    aniosPago: bono.QAniosPago,

    tipoPeriodoFrecuenciaCupon: bono.NPeriodoFrecuenciaCuponTipo,
    numeroDias: bono.QDias,
    tipoTasaEfectiva: bono.TipoTasaIsEfectiva,
    tipoPeriodoCapitalTn: bono.NPeriodoCapitalTNTipo,

    //FALTA EN BACK
    perTasaInteres: String(bono.PerTasaInteres),

    perTasaAnualDescuento: String(bono.PerTasaAnualDescuento),
    perImportRenta: String(bono.PerImportRenta),
    fechaEmision: bono.DEmision,

    perPrima: String(bono.PerPrima),

    perEstructuracion: String(bono.PerEstructuracion),
    perColocacion: String(bono.PerColocacion),
    perFlotacion: String(bono.PerFlotacion),
    perCavali: String(bono.PerCavali),
    periodosGracia: bono.QPeriodosGracia,

    inflacionAnual: convertLInflacion(bono.LInflacionAnual)
  }
}

export function convertLInflacion(l: any){
  let temp = new Array(l.length)
  for (let i=0;i<l.length;i++){
    temp[i] = (String(l[i]))
  }
  return temp
}
