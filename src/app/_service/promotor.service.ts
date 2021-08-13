import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Promotor } from '../_model/promotor';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PromotorService extends GenericService<Promotor> {

  private promotorCambio: Subject<Promotor[]> = new Subject<Promotor[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();  

  constructor(protected http: HttpClient) { 
    super(
      http,
      `${environment.HOST}/promotor`);
  }

  /*listar() { //: Observable<Paciente[]>
    return this.http.get<Paciente[]>(this.url);
  }

  listarPorId(id: number) {
    return this.http.get<Paciente>(`${this.url}/${id}`);
  }

  registrar(paciente: Paciente) {
    return this.http.post(`${this.url}`, paciente);
  }

  modificar(paciente: Paciente) {
    return this.http.put(`${this.url}`, paciente);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }*/

  ///////////////////////
  getPromotorCambio(){
    return this.promotorCambio.asObservable();
  }

  setPromotorCambio(lista: Promotor[]){
    this.promotorCambio.next(lista);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(texto: string){
    this.mensajeCambio.next(texto);
  }

}
