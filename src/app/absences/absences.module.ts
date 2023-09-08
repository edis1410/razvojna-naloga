import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsencesComponent } from './absences.component';
import { AbsencesRoutingModule } from './absences-routing.module';



@NgModule({
  declarations: [AbsencesComponent],
  imports: [
    CommonModule,
    AbsencesRoutingModule
  ]
})
export class AbsencesModule { }
