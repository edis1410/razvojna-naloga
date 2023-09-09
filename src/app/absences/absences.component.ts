import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { Absence } from '../Absence';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css'],
})
export class AbsencesComponent {
  absences: Absence[] = [];
  selectedDate: Date = new Date();

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    public datepipe: DatePipe
  ) {}

  fetchAbsences(): void {
    this.authService.getAccessToken().subscribe((accessToken) => {
      this.apiService.getAbsences(accessToken).subscribe(
        (data: Absence[]) => {
          this.absences = data;
          this.filterAbsencesBySelectedDate();
        },
        (error) => {
          console.error('Error fetching absences:', error);
        }
      );
    });
  }

  filterAbsencesBySelectedDate(): void {
    this.absences = this.absences.filter((absence) => {
      const partialTimeFrom = new Date(absence.PartialTimeFrom);
      let from =this.datepipe.transform(partialTimeFrom, 'yyyy-MM-dd');
      const partialTimeTo = new Date(absence.PartialTimeTo);
      let to =this.datepipe.transform(partialTimeTo, 'yyyy-MM-dd');
      let current =this.datepipe.transform(this.selectedDate, 'yyyy-MM-dd');
      return (
        current! >= from! && current! <= to!
      );
    });
  }

  onDateSelected(): void {
    this.filterAbsencesBySelectedDate();
    this.fetchAbsences()
  }


  refreshList(): void {
    this.fetchAbsences();
  }
}
