import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Promotor } from 'src/app/_model/promotor';
import { PromotorService } from 'src/app/_service/promotor.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-promotor-edicion',
  templateUrl: './promotor-edicion.component.html',
  styleUrls: ['./promotor-edicion.component.css']
})
export class PromotorEdicionComponent implements OnInit {

  form: FormGroup;    // = new FormGroup({});
  promotor: Promotor;
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private promotorService: PromotorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.promotor = new Promotor();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'dni': new FormControl(''),
      'apepat': new FormControl(''),
      'apemat': new FormControl(''),
      'nombres': new FormControl(''),
      'direccion': new FormControl('')
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.promotorService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idPromotor),
          'dni': new FormControl(data.dni),
          'apepat': new FormControl(data.apepat),
          'apemat': new FormControl(data.apemat),
          'nombres': new FormControl(data.nombres),
          'direccion': new FormControl(data.direccion)
        });
      });
    }
  }

  operar(){
    let promotor = new Promotor();
    promotor.idPromotor = this.form.value['id'];
    promotor.dni = this.form.value['dni'];
    promotor.apepat = this.form.value['apepat'];
    promotor.apemat = this.form.value['apemat'];
    promotor.nombres = this.form.value['nombres'];
    promotor.direccion = this.form.value['direccion'];

    if (this.edicion) {
      //PRACTICA IDEAL
      //MODIFICAR
      this.promotorService.modificar(promotor).pipe(switchMap(() => {
        return this.promotorService.listar();
      }))
      .subscribe(data => {
          this.promotorService.setPromotorCambio(data);     // aqui actualizamos el registro regien modificado 
          this.promotorService.setMensajeCambio('SE MODIFICO');
        });
    } else {
      //PRACTICA IDEAL
      //REGISTRAR
      this.promotorService.registrar(promotor).pipe(switchMap(() => {
        return this.promotorService.listar();
      }))
      .subscribe(data => {
        this.promotorService.setPromotorCambio(data);
        this.promotorService.setMensajeCambio('SE REGISTRO');
      });
    }

    this.router.navigate(['promotor']);
  }
}
