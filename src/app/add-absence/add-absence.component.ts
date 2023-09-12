import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { PostAbsence } from '../Post_Absence';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-absence',
  templateUrl: './add-absence.component.html',
  styleUrls: ['./add-absence.component.css']
})
export class AddAbsenceComponent implements OnInit {
  responseData: any;
  error: string | null = null;
  public id: string ='';
  current = new Date();
radioSelected: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe
  ) {}
  public addAbsenceForm = this.fb.group({
    Id: this.fb.control<string | null>(null, [Validators.required]),
    PartialTimeFrom: this.fb.control<string | null>(null, [Validators.required]),
    PartialTimeTo: this.fb.control<string | null>(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
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

  public add(): void {
    if (this.addAbsenceForm.valid) {
      const addAbsenceFormData = this.addAbsenceForm.getRawValue();
      let from =this.datepipe.transform(addAbsenceFormData.PartialTimeFrom, 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ');
      let to =this.datepipe.transform(addAbsenceFormData.PartialTimeTo, 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ');
      let curr =this.datepipe.transform(this.current, 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ');
      var ad = <PostAbsence>{
        UserId: this.id,
        Timestamp: curr,
        AbsenceDefinitionId: addAbsenceFormData.Id,
        Origin: 0,
        Comment: "comment",
        PartialTimeFrom: from,
        PartialTimeTo: to,
        PartialTimeDuration: 0,
        IsPartial: true,
        OverrideHolidayAbsence: true
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
