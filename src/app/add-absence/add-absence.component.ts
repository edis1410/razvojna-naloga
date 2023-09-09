import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Absence } from '../Absence';

@Component({
  selector: 'app-add-absence',
  templateUrl: './add-absence.component.html',
  styleUrls: ['./add-absence.component.css']
})
export class AddAbsenceComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private authService: AuthService
  ) {}
  public addAbsenceForm = this.fb.group({
    UserId: this.fb.control<string | null>(null, [Validators.required]),
    Comment: this.fb.control<string | null>(null, [Validators.required]),
    PartialTimeFrom: this.fb.control<string | null>(null, [Validators.required]),
    PartialTimeTo: this.fb.control<string | null>(null, [Validators.required]),
  });

  public add(): void {
    if (this.addAbsenceForm.valid) {
      const settingsFormData = this.addAbsenceForm.getRawValue();
      this.authService.getAccessToken().subscribe((accessToken) => {
        this.api.setAbsence(settingsFormData as Absence, accessToken).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error(error);
          }
        );
        // this.router.navigate(['/users']);
      });
    } else {
      console.log('Handle errors');
    }
  }
}
