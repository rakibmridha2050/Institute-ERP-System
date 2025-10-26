import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/model/course.model';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  isEdit = false;
  courseId?: number;
  isLoading = false;
  error = '';
  isCheckingCode = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.courseForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.courseId = +params['id'];
        this.loadCourse(this.courseId);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      courseCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      credits: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      departmentId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  loadCourse(id: number): void {
    this.isLoading = true;
    this.courseService.getCourseById(id).subscribe({
      next: (course) => {
        this.courseForm.patchValue(course);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error loading course';
        this.isLoading = false;
        console.error('Error loading course:', error);
      }
    });
  }

  checkCourseCode(): void {
    const courseCode = this.courseCode?.value;
    if (courseCode && courseCode.length >= 2 && !this.isEdit) {
      this.isCheckingCode = true;
      this.courseService.checkCourseCodeExists(courseCode).subscribe({
        next: (exists) => {
          if (exists) {
            this.courseCode?.setErrors({ courseCodeExists: true });
          }
          this.isCheckingCode = false;
        },
        error: () => {
          this.isCheckingCode = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.isLoading = true;
      const courseData: Course = this.courseForm.value;

      if (this.isEdit && this.courseId) {
        this.courseService.updateCourse(this.courseId, courseData).subscribe({
          next: () => {
            this.router.navigate(['/admin/courses']);
          },
          error: (error) => {
            this.handleError(error, 'updating');
          }
        });
      } else {
        this.courseService.createCourse(courseData).subscribe({
          next: () => {
            this.router.navigate(['/admin/courses']);
          },
          error: (error) => {
            this.handleError(error, 'creating');
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private handleError(error: any, action: string): void {
    this.error = `Error ${action} course`;
    this.isLoading = false;
    console.error(`Error ${action} course:`, error);
    
    if (error.error && error.error.message) {
      this.error += `: ${error.error.message}`;
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.courseForm.controls).forEach(key => {
      const control = this.courseForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/courses']);
  }

  // Getters for easy access in template
  get courseCode() { return this.courseForm.get('courseCode'); }
  get courseName() { return this.courseForm.get('courseName'); }
  get credits() { return this.courseForm.get('credits'); }
  get departmentId() { return this.courseForm.get('departmentId'); }
}
