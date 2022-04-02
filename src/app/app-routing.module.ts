import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'',redirectTo: 'login', pathMatch:'full'},
  {path: 'list', component: ListComponent},
  {path: 'create', component: CreateComponent},
  {path: 'update/:id', component: CreateComponent},
  {path: 'login', component: LoginComponent},
  {path:'**',redirectTo: 'login', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
