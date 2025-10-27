import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentResponseDTO } from 'src/app/model/student.model';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: StudentResponseDTO[] = [];
  loading = false;
  searchTerm = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.studentService.getAllStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.loading = false;
      }
    });
  }

  searchStudents(): void {
    if (this.searchTerm.trim()) {
      this.loading = true;
      this.studentService.searchStudentsByName(this.searchTerm).subscribe({
        next: (students) => {
          this.students = students;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error searching students:', error);
          this.loading = false;
        }
      });
    } else {
      this.loadStudents();
    }
  }

  editStudent(student: StudentResponseDTO): void {
    this.router.navigate(['/admin/students/edit', student.id]);
  }

  viewStudent(student: StudentResponseDTO): void {
    // You can implement view functionality if needed
    console.log('View student:', student);
  }

  deleteStudent(student: StudentResponseDTO): void {
    if (confirm(`Are you sure you want to delete ${student.name}?`)) {
      this.studentService.deleteStudent(student.id).subscribe({
        next: () => {
          this.loadStudents();
        },
        error: (error) => {
          console.error('Error deleting student:', error);
        }
      });
    }
  }

  addStudent(): void {
    this.router.navigate(['/admin/students/new']);
  }

  getStatusBadgeClass(isActive: boolean): string {
    return isActive ? 'badge bg-success' : 'badge bg-danger';
  }
}
