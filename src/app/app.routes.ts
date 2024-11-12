import { Routes } from '@angular/router';
import { ParametrizarComponent } from './parametrizar/parametrizar.component';
import { EjecucionesComponent } from './ejecuciones/ejecuciones.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },  // Ruta de inicio al login
  { path: 'parametrizar', component: ParametrizarComponent },  // Ruta a Parametrizar
  { path: 'ejecuciones', component: EjecucionesComponent },    // Ruta a Ejecuciones
  { path: '**', redirectTo: '' }  // Redirige cualquier ruta no definida al login
];
