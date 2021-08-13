import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Parmae } from 'src/app/_model/parmae';
import { ParmaeService } from 'src/app/_service/parmae.service';

@Component({
  selector: 'app-parmae-edicion',
  templateUrl: './parmae-edicion.component.html',
  styleUrls: ['./parmae-edicion.component.css']
})
export class ParmaeEdicionComponent implements OnInit {

  form: FormGroup;    // = new FormGroup({});
  parmae: Parmae;
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private parmaeService: ParmaeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.parmae = new Parmae();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'tipo': new FormControl(''),
      'codigo': new FormControl(''),
      'descri': new FormControl('')
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.parmaeService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idParmae),
          'tipo': new FormControl(data.tipo),
          'codigo': new FormControl(data.codigo),
          'descri': new FormControl(data.descri)
        });
      });
    }
  }

  operar(){
    let parmae = new Parmae();
    parmae.idParmae = this.form.value['id'];
    parmae.tipo = this.form.value['tipo'];
    parmae.codigo = this.form.value['codigo'];
    parmae.descri = this.form.value['descri'];

    if (this.edicion) {
      //PRACTICA IDEAL
      //MODIFICAR
      this.parmaeService.modificar(parmae).pipe(switchMap(() => {
        return this.parmaeService.listar();
      }))
      .subscribe(data => {
          this.parmaeService.setParmaeCambio(data);     // aqui actualizamos el registro regien modificado 
          this.parmaeService.setMensajeCambio('SE MODIFICO');
        });
    } else {
      //PRACTICA IDEAL
      //REGISTRAR
      this.parmaeService.registrar(parmae).pipe(switchMap(() => {
        return this.parmaeService.listar();
      }))
      .subscribe(data => {
        this.parmaeService.setParmaeCambio(data);
        this.parmaeService.setMensajeCambio('SE REGISTRO');
      });
    }

    this.router.navigate(['parmae']);
  }

}
