import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentSiteComponent } from './components/current-site/current-site.component';
import { HomeComponent } from './components/home/home.component';
import { SitesComponent } from './components/sites/sites.component';

const routes: Routes = [
   {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'websites', component: SitesComponent },
      { path: 'websites/:id', component: CurrentSiteComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
