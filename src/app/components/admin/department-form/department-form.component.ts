import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentUpdateRequest, DepartmentCreateRequest } from 'src/app/model/department.model';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {
  departmentForm: FormGroup;
  isEditMode = false;
  departmentId: number | null = null;
  loading = false;
  submitting = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) {
    this.departmentForm = this.createForm();
  }

  ngOnInit(): void {
    this.departmentId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.departmentId;

    if (this.isEditMode && this.departmentId) {
      this.loadDepartment(this.departmentId);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      deptName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      deptCode: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]]
    });
  }

  loadDepartment(id: number): void {
    this.loading = true;
    this.departmentService.getDepartmentById(id)
      .subscribe({
        next: (department) => {
          this.departmentForm.patchValue({
            deptName: department.deptName,
            deptCode: department.deptCode
          });
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message || 'Failed to load department';
          this.loading = false;
          console.error('Error loading department:', error);
        }
      });
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      this.submitting = true;
      this.error = '';

      const formValue = this.departmentForm.value;

      if (this.isEditMode && this.departmentId) {
        // Update existing department
        const updateRequest: DepartmentUpdateRequest = {
          deptName: formValue.deptName,
          deptCode: formValue.deptCode
        };

        this.departmentService.updateDepartment(this.departmentId, updateRequest)
          .subscribe({
            next: () => {
              this.submitting = false;
              this.router.navigate(['/admin/departments']);
            },
            error: (error) => {
              this.error = error.message || 'Failed to update department';
              this.submitting = false;
              console.error('Error updating department:', error);
            }
          });
      } else {
        // Create new department
        const createRequest: DepartmentCreateRequest = {
          deptName: formValue.deptName,
          deptCode: formValue.deptCode
        };

        this.departmentService.createDepartment(createRequest)
          .subscribe({
            next: () => {
              this.submitting = false;
              this.router.navigate(['/admin/departments']);
            },
            error: (error) => {
              this.error = error.message || 'Failed to create department';
              this.submitting = false;
              console.error('Error creating department:', error);
            }
          });
      }
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.departmentForm.controls).forEach(key => {
        this.departmentForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/departments']);
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.departmentForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.departmentForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'This field is required';
      }
      if (field.errors['minlength']) {
        return `Minimum length is ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['maxlength']) {
        return `Maximum length is ${field.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}