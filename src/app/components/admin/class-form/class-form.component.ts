import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/model/department.model';
import { ClassesServiceService } from 'src/app/service/classes-service.service';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss']
})
export class ClassFormComponent implements OnInit {
  classForm: FormGroup;
  departments: Department[] = [];
  isEditMode = false;
  classId: number | null = null;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private classesService: ClassesServiceService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.classForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.checkEditMode();
  }

  createForm(): FormGroup {
    return this.fb.group({
      className: ['', [Validators.required, Validators.minLength(3)]],
      departmentId: ['', [Validators.required]]
    });
  }

  checkEditMode(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.classId = +id;
        this.loadClassForEdit(this.classId);
      }
    });
  }

  loadDepartments(): void {
    this.isLoading = true;
    this.departmentService.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load departments';
        this.isLoading = false;
        console.error('Error loading departments:', error);
      }
    });
  }

  loadClassForEdit(id: number): void {
    this.isLoading = true;
    this.classesService.getClassById(id).subscribe({
      next: (classData) => {
        this.classForm.patchValue({
          className: classData.className,
          departmentId: classData.department.deptId
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load class data';
        this.isLoading = false;
        console.error('Error loading class:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.classForm.valid) {
      this.isSubmitting = true;
      const formData = this.classForm.value;

      if (this.isEditMode && this.classId) {
        // Update existing class
        this.classesService.updateClass(this.classId, formData).subscribe({
          next: () => {
            this.router.navigate(['/admin/classes']);
          },
          error: (error) => {
            this.handleError('Failed to update class', error);
          }
        });
      } else {
        // Create new class
        this.classesService.createClass(formData).subscribe({
          next: () => {
            this.router.navigate(['/admin/classes']);
          },
          error: (error) => {
            this.handleError('Either Class Name or Department Name already exists', error);
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private handleError(message: string, error: any): void {
    this.errorMessage = message;
    this.isSubmitting = false;
    console.error('Error:', error);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.classForm.controls).forEach(key => {
      this.classForm.get(key)?.markAsTouched();
    });
  }

  // Getters for easy access in template
  get className() { return this.classForm.get('className'); }
  get departmentId() { return this.classForm.get('departmentId'); }

  onCancel(): void {
    this.router.navigate(['/admin/classes']);
  }
}