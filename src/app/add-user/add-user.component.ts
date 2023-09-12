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

  public generateRandomString(): string {
    const template = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
    return template.replace(/x/g, () => {
      const randomChar = Math.floor(Math.random() * 16).toString(16);
      return randomChar;
    });
  }

  public add(): void {
    if (this.addUserForm.valid) {
      const settingsFormData = this.addUserForm.getRawValue();
      var ud = <User>{
        Id: this.generateRandomString(),
        FirstName: settingsFormData.FirstName,
        LastName: settingsFormData.LastName,
        MiddleName: null,
        FullName: settingsFormData.FirstName! + settingsFormData.LastName!,
        BirthDate: null,
        Address: null,
        City: null,
        State: null,
        Phone: null,
        Mobile: null,
        Email: settingsFormData.Email,
        Gender: '',
        PictureUri: null,
        CustomId: null,
        CustomField1: null,
        CustomField2: null,
        CustomField3: null,
        CustomField4: null,
        CustomField5: null,
        CustomField6: null,
        CustomField7: null,
        CustomField8: null,
        CustomField9: null,
        CustomField10: null,
        IsTimeAttendanceUser: false,
        IsArchived: false,
        HasUserAccount: false,
        UserAccountId: null,
        UserName: null,
        CalculationStartDate: null,
        CalculationStopDate: null,
        HasAssignedPin: null,
      };
      this.authService.getAccessToken().subscribe((accessToken) => {
        this.api.setUser(accessToken, ud).subscribe(
          (response) => {
            console.log(response);
            this.router.navigate(['/users']);
          },
          (error) => {
            console.error(error);
          }
        );
      });
    } else {
      console.log('Handle errors');
    }
  }
}
