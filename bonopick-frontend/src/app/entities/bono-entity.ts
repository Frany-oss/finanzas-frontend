import {BonoDbEntity} from "./bono-db-entity";

export interface Bono {
  BonistaId: any,
  Nombre: any,
  MValorNominal: any,
  MValorComercial: any,
  QAniosPago: any,
  NPeriodoFrecuenciaCuponTipo: any,
  QDias: any,
  TipoTasaIsEfectiva: any,
  NPeriodoCapitalTNTipo: any,
  PerTasaInteres: any,
  PerTasaAnualDescuento: any,
  PerImportRenta: any,
  DEmision: any,
  PerPrima: any,
  PerEstructuracion: any,
  PerColocacion: any,
  PerFlotacion: any,
  PerCavali: any,
  QPeriodosGracia: any,
  LInflacionAnual: any
}

export function bonoDbtoBono(bonoDb: BonoDbEntity): any{
  return {

    id: bonoDb.bonoCorporativoId,

    Nombre: bonoDb.nombreCalculoBono,

    MValorNominal: Number(bonoDb.valorNominal),
    MValorComercial: Number(bonoDb.valorComercial),

    QAniosPago: bonoDb.aniosPago,

    NPeriodoFrecuenciaCuponTipo: bonoDb.tipoPeriodoFrecuenciaCupon,
    QDias: bonoDb.numeroDias,
    TipoTasaIsEfectiva: bonoDb.tipoTasaEfectiva,
    NPeriodoCapitalTNTipo: bonoDb.tipoPeriodoCapitalTn,

    //FALTA EN BACK
    PerTasaInteres: Number(bonoDb.perTasaInteres),

    PerTasaAnualDescuento: Number(bonoDb.perTasaAnualDescuento),
    PerImportRenta: Number(bonoDb.perImportRenta),
    DEmision: bonoDb.fechaEmision,

    //FALTA EN BACK
    PerPrima: Number(bonoDb.perPrima),

    PerEstructuracion: Number(bonoDb.perEstructuracion),
    PerColocacion: Number(bonoDb.perColocacion),
    PerFlotacion: Number(bonoDb.perFlotacion),
    PerCavali: Number(bonoDb.perCavali),
    QPeriodosGracia: bonoDb.periodosGracia,

    LInflacionAnual: convertLInflacion(bonoDb.inflacionAnual)
  }
}

export function convertLInflacion(l: any){
  let temp = new Array(l.length)
  for (let i=0;i<l.length;i++){
    temp[i] = (Number(l[i]))
  }
  return temp
}
