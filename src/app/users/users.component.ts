import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  responseData: any;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.authService.getAccessToken().subscribe((accessToken) => {
      this.apiService.getUsers(accessToken).subscribe(
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
}
