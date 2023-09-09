import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from 'src/User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService
  ) {}

  public addUserForm = this.fb.group({
    FirstName: this.fb.control<string | null>(null, [Validators.required]),
    LastName: this.fb.control<string | null>(null, [Validators.required]),
    Email: this.fb.control<string | null>(null, [Validators.email]),
  });

  public add(): void {
    if (this.addUserForm.valid) {
      const settingsFormData = this.addUserForm.getRawValue();
      this.api.setUser(settingsFormData as User);
      // this.router.navigate(['/users']);
    } else {
      console.log('Handle errors');
    }
  }
}
