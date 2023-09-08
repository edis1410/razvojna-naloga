import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

    const apiUrl = `${this.apiUrl}/api/v1/Users`;

    return this.http.get(apiUrl, { headers });
  }
}
