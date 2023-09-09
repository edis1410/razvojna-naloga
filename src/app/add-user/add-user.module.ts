import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user.component';
import { AddUserRoutingModule } from './add-user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddUserComponent],
  imports: [
    CommonModule,
    AddUserRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddUserModule { }
