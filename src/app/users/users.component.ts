import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  responseData: any;
  filteredData: any; // Store the filtered data here
  error: string | null = null;
  searchTerm: string = ''; // Store the search term here

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.authService.getAccessToken().subscribe((accessToken) => {
      this.apiService.getUsers(accessToken).subscribe(
        (data) => {
          this.responseData = data;
          this.filteredData = data; // Initialize filteredData with all data
          this.error = null;
        },
        (error) => {
          this.error = error.message || 'An error occurred';
          this.responseData = null;
          this.filteredData = null;
        }
      );
    });
  }

  // Method to filter data based on the search term
  filterData() {
    if (!this.searchTerm) {
      this.filteredData = this.responseData; // Reset to all data if the search term is empty
    } else {
      const searchTermLowerCase = this.searchTerm.toLowerCase();
      this.filteredData = this.responseData.filter((item: any) => {
        const firstName = item.FirstName.toLowerCase();
        const lastName = item.LastName.toLowerCase();
        return firstName.includes(searchTermLowerCase) || lastName.includes(searchTermLowerCase);
      });
    }
  }
}
