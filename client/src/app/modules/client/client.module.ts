import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './components/survey/survey.component';
import { ClientRoutingModule } from './client-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    SurveyComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
