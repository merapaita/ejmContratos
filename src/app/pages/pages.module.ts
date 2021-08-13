import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContratoComponent } from './contrato/contrato.component';
import { ParmaeComponent } from './parmae/parmae.component';
import { PromotorComponent } from './promotor/promotor.component';
import { InicioComponent } from './inicio/inicio.component';
import { LayoutComponent } from './layout/layout.component';
import { Not403Component } from './not403/not403.component';
import { Not404Component } from './not404/not404.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
//    PdfViewerModule,
    PagesRoutingModule
  ],
  exports: [],
  declarations: [
    ContratoComponent,
    PromotorComponent,
    ParmaeComponent,
    LayoutComponent,
    InicioComponent,
    Not403Component,
    Not404Component
  ],
  providers: [],
})
export class PagesModule { }
