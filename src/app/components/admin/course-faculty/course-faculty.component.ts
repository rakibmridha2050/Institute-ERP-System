import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-course-faculty',
  templateUrl: './course-faculty.component.html',
  styleUrls: ['./course-faculty.component.scss']
})
export class CourseFacultyComponent implements OnInit {
  course: Course | null = null;
  isLoading = true;
  error = '';
  newFacultyId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.params['id'];
    this.loadCourse(courseId);
  }

  loadCourse(courseId: number): void {
    this.isLoading = true;
    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.course = course;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error loading course';
        this.isLoading = false;
        console.error('Error loading course:', error);
      }
    });
  }

  addFaculty(): void {
    if (this.newFacultyId && this.course) {
      this.courseService.addFacultyToCourse(this.course.id!, this.newFacultyId).subscribe({
        next: (updatedCourse) => {
          this.course = updatedCourse;
          this.newFacultyId = null;
        },
        error: (error) => {
          console.error('Error adding faculty:', error);
          alert('Error adding faculty to course');
        }
      });
    }
  }

  removeFaculty(facultyId: number): void {
    if (this.course && confirm('Are you sure you want to remove this faculty from the course?')) {
      this.courseService.removeFacultyFromCourse(this.course.id!, facultyId).subscribe({
        next: (updatedCourse) => {
          this.course = updatedCourse;
        },
        error: (error) => {
          console.error('Error removing faculty:', error);
          alert('Error removing faculty from course');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/courses']);
  }
}
