import { Component, OnInit } from '@angular/core';
import { ClassesDTO } from 'src/app/model/classes.model';
import { ClassesServiceService } from 'src/app/service/classes-service.service';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss']
})
export class ClassesListComponent implements OnInit {
  classes: ClassesDTO[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private classesService: ClassesServiceService) { }

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.isLoading = true;
    this.classesService.getAllClasses().subscribe({
      next: (data) => {
        this.classes = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load classes';
        this.isLoading = false;
        console.error('Error loading classes:', error);
      }
    });
  }

  deleteClass(id: number): void {
    if (confirm('Are you sure you want to delete this class?')) {
      this.classesService.deleteClass(id).subscribe({
        next: () => {
          this.classes = this.classes.filter(cls => cls.id !== id);
          console.log("delating with id: " + id);
          
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete class';
          console.error('Error deleting class:', error);
        }
      });
    }
  }
}