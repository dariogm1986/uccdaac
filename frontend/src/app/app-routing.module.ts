import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { LoginComponent } from './modules/login/login.component';
import {UnidadeComponent} from './components/unidade/unidade.component'; 
import { ProvinciaComponent } from './components/provincia/provincia.component';
import { MunicipioComponent } from './components/municipio/municipio.component';



const routes: Routes = [
  {
    path:'',
    component:DefaultComponent,
    children:[{
      path:'',
      component:DashboardComponent
    },
    {
      path:'posts',
      component:PostsComponent
    },
    {
      path:'unidade',
      component:UnidadeComponent
    },
    {
      path:'provincia',
      component: ProvinciaComponent
    },
    {
      path:'municipio',
      component: MunicipioComponent
    }    
  ]
  },
  {
    path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
