import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsencesComponent } from './absences.component';
import { AbsencesRoutingModule } from './absences-routing.module';
import { CalendarModule } from 'angular-calendar';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AbsencesComponent],
  imports: [
    CommonModule,
    AbsencesRoutingModule,
    CalendarModule,
    FormsModule
  ]
})
export class AbsencesModule { }
