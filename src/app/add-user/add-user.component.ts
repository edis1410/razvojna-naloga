import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { User } from 'src/app/User';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private authService: AuthService
  ) {}

  public addUserForm = this.fb.group({
    FirstName: this.fb.control<string | null>(null, [Validators.required]),
    LastName: this.fb.control<string | null>(null, [Validators.required]),
    Email: this.fb.control<string | null>(null, [Validators.email]),
  });

  public add(): void {
    if (this.addUserForm.valid) {
      const settingsFormData = this.addUserForm.getRawValue();
      this.authService.getAccessToken().subscribe((accessToken) => {
        this.api.setUser(settingsFormData as User, accessToken).subscribe(
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
