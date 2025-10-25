import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Department } from 'src/app/model/department.model';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  loading = false;
  error = '';

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.loading = true;
    this.error = '';
    
    this.departmentService.getAllDepartments()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => {
          this.departments = data;
        },
        error: (error) => {
          this.error = error.message || 'Failed to load departments';
          console.error('Error loading departments:', error);
        }
      });
  }

  deleteDepartment(id: number): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(id)
        .subscribe({
          next: () => {
            this.departments = this.departments.filter(dept => dept.deptId !== id);
          },
          error: (error) => {
            this.error = error.message || 'Failed to delete department';
            console.error('Error deleting department:', error);
          }
        });
    }
  }

  refresh(): void {
    this.loadDepartments();
  }
}