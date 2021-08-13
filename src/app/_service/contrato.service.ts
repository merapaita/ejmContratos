import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GenericService } from '../_service/generic.service';
import { Contrato } from '../_model/contrato';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContratoService extends GenericService<Contrato> {

  private contratoCambio = new Subject<Contrato[]>();
  private mensajeCambio = new Subject<string>();
  private newCodcon = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/contrato`);
  }

  //get Subjects
  getContratoCambio() {
    return this.contratoCambio.asObservable();
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  getnewCodcon(tipcon: string) {
    return this.http.get<Contrato>(`${this.url}/newCodcon/${tipcon}`);
  }

  //set Subjects
  setContratoCambio(contrato: Contrato[]) {
    this.contratoCambio.next(contrato);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  setNewCodCon(tipcon: string) {
    this.newCodcon.next(tipcon);
  }

}