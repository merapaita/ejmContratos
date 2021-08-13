import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ContratoEdicionComponent } from './contrato/contrato-edicion/contrato-edicion.component';
import { ContratoComponent } from './contrato/contrato.component';
import { ParmaeEdicionComponent } from './parmae/parmae-edicion/parmae-edicion.component';
import { ParmaeComponent } from './parmae/parmae.component';
import { PromotorEdicionComponent } from './promotor/promotor-edicion/promotor-edicion.component';
import { PromotorComponent } from './promotor/promotor.component';
import { Not403Component } from './not403/not403.component';
import { GuardService } from '../_service/guard.service';

export const routes: Routes = [
    { path: 'inicio', component: InicioComponent, canActivate: [GuardService] },
    {
        path: 'contrato', component: ContratoComponent, children: [
            { path: 'nuevo', component: ContratoEdicionComponent }
        ], canActivate: [GuardService]
    },
    {
        path: 'promotor', component: PromotorComponent, children: [
            { path: 'nuevo', component: PromotorEdicionComponent },
            { path: 'edicion/:id', component: PromotorEdicionComponent }
        ], canActivate: [GuardService]
    },
    {
        path: 'parmae', component: ParmaeComponent, children: [
            { path: 'nuevo', component: ParmaeEdicionComponent },
            { path: 'edicion/:id', component: ParmaeEdicionComponent }
        ], canActivate: [GuardService]
    },
    { path: 'not-403', component: Not403Component}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
