import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from 'src/app/User';
import { Absence } from './Absence';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api4.allhours.com';

  constructor(private http: HttpClient) {}

  getUsers(accessToken: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type', 'application/json');

    const url = `${this.apiUrl}/api/v1/Users`;

    return this.http.get(url, { headers });
  }

  setUser(accessToken: string, userData: User): Observable<any> {
    const url = `${this.apiUrl}/api/v1/Users`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type', 'application/json');
    return this.http
      .post(url, JSON.stringify(userData), { headers })
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError(error);
        })
      );
  }

  getAbsences(accessToken: string): Observable<Absence[]> {
    const url = `${this.apiUrl}/api/v1/Absences`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type', 'application/json');

    return this.http.get<Absence[]>(url, { headers });
  }
  setAbsence(userData: Absence, accessToken: string): Observable<any> {
    const url = `${this.apiUrl}/api/v1/Users`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type', 'application/json');

    console.log(userData);
    return this.http
      .post(url, JSON.stringify(userData), { headers })
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError(error);
        })
      );
  }
}
