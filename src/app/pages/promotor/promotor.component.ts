import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Promotor } from 'src/app/_model/promotor';
import { PromotorService } from 'src/app/_service/promotor.service';

@Component({
  selector: 'app-promotor',
  templateUrl: './promotor.component.html',
  styleUrls: ['./promotor.component.css']
})
export class PromotorComponent implements OnInit {

  dataSource: MatTableDataSource<Promotor>; // = new MatTableDataSource();
  displayedColumns: string[] = ['idPromotor', 'dni', 'apepat', 'apemat', 'nombres', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private promotorService: PromotorService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.promotorService.getPromotorCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.promotorService.getMensajeCambio().subscribe(texto => {
      this.snackBar.open(texto, 'AVISO', {duration:2000});
    });

    this.promotorService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  eliminar(promotor: Promotor) {
    console.log("promotor " + promotor);
    this.promotorService.eliminar(promotor.idPromotor).pipe(switchMap(() => {
      return this.promotorService.listar();
    })).subscribe(data => {
      this.promotorService.setPromotorCambio(data);
      this.promotorService.setMensajeCambio('Se eliminó');
    });
  }

  crearTabla(data: Promotor[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
