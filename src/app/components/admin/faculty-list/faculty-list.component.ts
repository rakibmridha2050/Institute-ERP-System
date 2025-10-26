import { Component, OnInit } from '@angular/core';
import { Faculty } from 'src/app/model/faculty.model';
import { FacultyService } from 'src/app/service/faculty.service';


@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.scss']
})
export class FacultyListComponent implements OnInit {
  faculties: Faculty[] = [];
  isLoading = true;
  error = '';

  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.loadFaculties();
  }

  loadFaculties(): void {
    this.isLoading = true;
    this.facultyService.getAllFaculty().subscribe({
      next: (data) => {
        this.faculties = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error loading faculties';
        this.isLoading = false;
        console.error('Error loading faculties:', error);
      }
    });
  }

  deleteFaculty(id: number): void {
    if (confirm('Are you sure you want to delete this faculty?')) {
      this.facultyService.deleteFaculty(id).subscribe({
        next: () => {
          this.faculties = this.faculties.filter(f => f.id !== id);
        },
        error: (error) => {
          console.error('Error deleting faculty:', error);
          alert('Error deleting faculty');
        }
      });
    }
  }
}