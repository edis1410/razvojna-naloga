import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string = '';

  constructor(private http: HttpClient, private local: LocalService) {}

  private clientId = localStorage.getItem('id');
  private clientSecret = localStorage.getItem('secret');
  private tokenUrl = 'https://login.allhours.com/connect/token';

  getAccessToken(): Observable<string> {
    if (this.accessToken && !this.isTokenExpired(this.accessToken)) {
      return new Observable<string>((observer) => {
        observer.next(this.accessToken as string);
        observer.complete();
      });
    }

    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', this.clientId!)
      .set('client_secret', this.clientSecret!)
      .set('scope', 'api');

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.post(this.tokenUrl, body.toString(), { headers }).pipe(
      map((response: any) => {
        if (response.access_token) {
          this.accessToken = response.access_token;
          return this.accessToken;
        } else {
          throw new Error('Access token not found in response');
        }
      })
    );
  }

  private isTokenExpired(token: string): boolean {
    return false;
  }
}
