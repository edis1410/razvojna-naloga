import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAbsenceComponent } from './add-absence.component';
import { AddAbsenceRoutingModule } from './add-absence-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddAbsenceComponent],
  imports: [
    CommonModule,
    AddAbsenceRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AddAbsenceModule { }
