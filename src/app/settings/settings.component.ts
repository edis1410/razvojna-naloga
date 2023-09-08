import { Component } from '@angular/core';
import { LocalService } from '../local.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {
  constructor(private local: LocalService, private fb: FormBuilder, private router: Router) {}


  public settingsForm = this.fb.group({
    id: this.fb.control<string | null>(null, [Validators.required]),
    secret: this.fb.control<string | null>(null, [Validators.required]),
  });

  get id() {
    return this.settingsForm.get('id');
  }
  get secret() {
    return this.settingsForm.get('secret');
  }

  public add(): void {
    if (this.settingsForm.valid) {
      const settingsFormData = this.settingsForm.getRawValue();
      localStorage.setItem('id', settingsFormData.id!)
      localStorage.setItem('secret', settingsFormData.secret!)
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Handle errors');
    }
  }
}
