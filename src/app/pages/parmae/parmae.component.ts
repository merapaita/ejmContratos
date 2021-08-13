import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ParmaeService } from 'src/app/_service/parmae.service';
import { Parmae } from '../../_model/parmae';

@Component({
  selector: 'app-parmae',
  templateUrl: './parmae.component.html',
  styleUrls: ['./parmae.component.css']
})
export class ParmaeComponent implements OnInit {

  dataSource: MatTableDataSource<Parmae>; // = new MatTableDataSource();
  displayedColumns: string[] = ['idParmae', 'tipo', 'codigo', 'descri', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private parmaeService: ParmaeService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.parmaeService.getParmaeCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.parmaeService.getMensajeCambio().subscribe(texto => {
      this.snackBar.open(texto, 'AVISO', {duration:2000});
    });

    this.parmaeService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  eliminar(parmae: Parmae) {
    console.log("parametro " + parmae);
    this.parmaeService.eliminar(parmae.idParmae).pipe(switchMap(() => {
      return this.parmaeService.listar();
    })).subscribe(data => {
      this.parmaeService.setParmaeCambio(data);
      this.parmaeService.setMensajeCambio('Se eliminó');
    });
  }

  crearTabla(data: Parmae[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
