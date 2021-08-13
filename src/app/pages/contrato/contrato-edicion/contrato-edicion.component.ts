import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import { Contrato } from 'src/app/_model/contrato';
import { Parmae } from 'src/app/_model/parmae';
import { Promotor } from 'src/app/_model/promotor';
import { ContratoService } from 'src/app/_service/contrato.service';
import { ParmaeService } from 'src/app/_service/parmae.service';
import { PromotorService } from 'src/app/_service/promotor.service';
import { Detitecon } from 'src/app/_model/detItecon';
import { Contrato } from 'src/app/_model/contrato';
import { Socio } from 'src/app/_model/socio';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrato-edicion',
  templateUrl: './contrato-edicion.component.html',
  styleUrls: ['./contrato-edicion.component.css']
})
export class ContratoEdicionComponent implements OnInit {

  edicion: boolean = false;

  ltipcon$: Observable<Parmae[]>;
  lpromotor$: Observable<Promotor[]>;

  idContrato: string;
  codcon: string;

  tipconSeleccionado: string;
  fechaSeleccionada: Date = new Date();
  promotorSeleccionado: number;
  inscripcion:number;
  mtotot:number;
  cuota:number;
  numcuotas:number;

  maxFecha: Date = new Date();

  detitecon: Detitecon[] = [];

  dni: string;
  apepat: string;
  apemat: string;
  nombres: string;
  direccion: string;
  fecnacSeleccionada: Date;
//  fecnac: string;
  telefono: string;

  // contrato: Contrato;
  // idContrato: number = 0;
  // edicion: boolean = false;

  constructor(
    private parmaeService: ParmaeService,
    private promotorService: PromotorService,
    private contratoService: ContratoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idContrato = "";
    this.tipconSeleccionado="";
    this.codcon="";
    this.ltipcon$ = this.parmaeService.listarPorTipo("tipo/TIPCON"); //.subscribe(data => this.pacientes = data);
    this.lpromotor$ = this.promotorService.listar(); //.subscribe(data => this.pacientes = data);
    this.promotorSeleccionado=0;
    this.inscripcion=0;
    this.mtotot=0;
    this.cuota=0;
    this.numcuotas=0;
    this.edicion = false;
//    this.edicion = this.idContrato != null;
}

  initForm() {
    // if (this.edicion) {
    //   this.contratoService.listarPorId(this.idContrato).subscribe(data => {
    //   });
    // }
  }

  aceptar(){
    let promotor = new Promotor();
    promotor.idPromotor = this.promotorSeleccionado;

    let contrato = new Contrato();
    contrato.tipcon = this.tipconSeleccionado;
    contrato.codcon = this.codcon;
    contrato.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DD');
    contrato.promotor = promotor;
    contrato.inscripcion = this.inscripcion;
    contrato.mtotot = this.mtotot;
    contrato.cuota = this.cuota
    contrato.numcuotas = this.numcuotas

    contrato.detitecon = this.detitecon;

    console.log(contrato);

    if (this.edicion) {
      //MODIFICAR
    } else {
      //REGISTRAR
      this.contratoService.registrar(contrato).pipe(switchMap(() => {
        return this.contratoService.listar();
      }))
        .subscribe(data => {
          this.contratoService.setContratoCambio(data);
          this.contratoService.setMensajeCambio('SE REGISTRO');
        });
    }

    this.router.navigate(['contrato']);

  }

  agregarDetalle(){
    let socio = new Socio();
    socio.dni = this.dni;
    socio.apepat = this.apepat;
    socio.apemat = this.apemat;
    socio.nombres = this.nombres;
    socio.direccion = this.direccion;
    socio.fecnac = moment(this.fecnacSeleccionada).format('YYYY-MM-DD');
    socio.telefono = this.telefono;

    let det = new Detitecon();
    det.socio = socio;

    this.detitecon.push(det);
  }

  removerDetalle(index: number) {
    this.detitecon.splice(index, 1);
  }

  onValidaTipCon($event) {
    this.contratoService.getnewCodcon($event.value).subscribe(data => {
      this.codcon = data.codcon;
  });
  }

  estadoBotonRegistrar() {
    let lvalCtas = 1;
    return (this.tipconSeleccionado.length === 0 || this.codcon.length === 0 || this.fechaSeleccionada === null ||
            this.promotorSeleccionado === 0 || lvalCtas === 0 || this.detitecon.length === 0);
  }

}