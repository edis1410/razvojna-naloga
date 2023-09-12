import { Component, OnInit } from '@angular/core';
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
export class AddAbsenceComponent implements OnInit {
  responseData: any;
  error: string | null = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private authService: AuthService
  ) {}
  public addAbsenceForm = this.fb.group({
    UserId: this.fb.control<string | null>(null, [Validators.required]),
    AbsenceDefinitionName: this.fb.control<string | null>(null, [Validators.required]),
    PartialTimeFrom: this.fb.control<string | null>(null, [Validators.required]),
    PartialTimeTo: this.fb.control<string | null>(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.authService.getAccessToken().subscribe((accessToken) => {
      this.api.getAbsenceDefinitions(accessToken).subscribe(
        (data) => {
          this.responseData = data;
          this.error = null;
        },
        (error) => {
          this.error = error.message || 'An error occurred';
          this.responseData = null;
        }
      );
    });
  }

  public generateRandomString(): string {
    const template = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
    return template.replace(/x/g, () => {
      const randomChar = Math.floor(Math.random() * 16).toString(16);
      return randomChar;
    });
  }

  public add(): void {
    if (this.addAbsenceForm.valid) {
      const addAbsenceFormData = this.addAbsenceForm.getRawValue();
      var ad = <Absence>{
        Id: this.generateRandomString(),
        UserId: addAbsenceFormData.UserId,
        GroupId: null,
        FirstName: null,
        MiddleName: null,
        LastName: null,
        Timestamp: null,
        AbsenceDefinitionId: null,
        AbsenceDefinitionName: addAbsenceFormData.AbsenceDefinitionName,
        InsertedOn: null,
        ModifiedOn: null,
        Origin: null,
        OriginDisplayName: null,
        Comment:  null,
        IsAuthentic: null,
        IconId: null,
        IconColor: null,
        IsCalculated: null,
        Status: null,
        ApprovalRequest:  null,
        PartialTimeFrom: addAbsenceFormData.PartialTimeFrom,
        PartialTimeTo: addAbsenceFormData.PartialTimeTo,
        PartialTimeDuration: null,
        IsPartial: null,
        OverrideHolidayAbsence:  null,
        IsModified: null,
        ModifiedByUser: null,
        AbsenceDefinitionType: null,
      }
      this.authService.getAccessToken().subscribe((accessToken) => {
        this.api.setAbsence(ad, accessToken).subscribe(
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
