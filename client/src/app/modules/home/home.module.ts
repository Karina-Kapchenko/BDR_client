import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SitesComponent } from './components/sites/sites.component';
import { CurrentSiteComponent } from './components/current-site/current-site.component';
import { CreateSiteDialogComponent } from './components/create-site-dialog/create-site-dialog.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    SitesComponent,
    CurrentSiteComponent,
    CreateSiteDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
