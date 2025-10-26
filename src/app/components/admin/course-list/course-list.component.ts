import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  isLoading = true;
  error = '';
  searchTerm = '';

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.filteredCourses = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error loading courses';
        this.isLoading = false;
        console.error('Error loading courses:', error);
      }
    });
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          this.courses = this.courses.filter(c => c.id !== id);
          this.filteredCourses = this.filteredCourses.filter(c => c.id !== id);
        },
        error: (error) => {
          console.error('Error deleting course:', error);
          alert('Error deleting course');
        }
      });
    }
  }

  filterCourses(): void {
    if (!this.searchTerm) {
      this.filteredCourses = this.courses;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredCourses = this.courses.filter(course =>
      course.courseCode.toLowerCase().includes(term) ||
      course.courseName.toLowerCase().includes(term) ||
      course.departmentName?.toLowerCase().includes(term)
    );
  }

  getFacultyCount(course: Course): number {
    return course.facultyCount || 0;
  }

  getStudentCount(course: Course): number {
    return course.studentCount || 0;
  }
}
