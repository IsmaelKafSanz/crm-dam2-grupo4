import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { CustomersComponent } from './customers/customers.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { IncidenciasComponent } from './incidencias/incidencias.component';
import { IncidenciaFormComponent } from './incidencia-form/incidencia-form.component';
import { AppUsersComponent } from './app-users/app-users.component';
import { AppUserFormComponent } from './app-user-form/app-user-form.component';
import { TareasComponent } from './tareas/tareas.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome/:name', component: WelcomeComponent, canActivate: [RouteGuardService] },
  { path: 'customers', component: CustomersComponent, canActivate: [RouteGuardService] },
  { path: 'customers/:id', component: CustomerFormComponent, canActivate: [RouteGuardService] },
  { path: 'incidencias', component: IncidenciasComponent, canActivate: [RouteGuardService] },
  { path: 'incidencias/:id', component: IncidenciaFormComponent, canActivate: [RouteGuardService] },
  { path: 'app-users', component: AppUsersComponent, canActivate: [RouteGuardService] },
  { path: 'app-users/:id', component: AppUserFormComponent, canActivate: [RouteGuardService] },
  { path: 'tareas', component: TareasComponent, canActivate: [RouteGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService] },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
