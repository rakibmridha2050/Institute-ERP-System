import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleClassDTO } from 'src/app/model/schedule-class.model';
import { ScheduleClassService } from 'src/app/service/schedule-class.service';

@Component({
  selector: 'app-schedule-class-form',
  templateUrl: './schedule-class-form.component.html',
  styleUrls: ['./schedule-class-form.component.scss']
})
export class ScheduleClassFormComponent implements OnInit {
  scheduleClassForm: FormGroup;
  isEdit = false;
  loading = false;
  error = '';
  id?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private scheduleClassService: ScheduleClassService
  ) {
    this.scheduleClassForm = this.createForm();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = !!this.id;

    if (this.isEdit && this.id) {
      this.loadScheduleClass(this.id);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      type: ['', [Validators.required, Validators.minLength(2)]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      status: ['Active', Validators.required]
    });
  }

  loadScheduleClass(id: number): void {
    this.loading = true;
    this.scheduleClassService.getById(id).subscribe({
      next: (scheduleClass) => {
        this.scheduleClassForm.patchValue({
          type: scheduleClass.type,
          startTime: scheduleClass.startTime,
          endTime: scheduleClass.endTime,
          status: scheduleClass.status
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading schedule class';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.scheduleClassForm.valid) {
      this.loading = true;
      const scheduleClassData: ScheduleClassDTO = this.scheduleClassForm.value;

      if (this.isEdit && this.id) {
        this.scheduleClassService.update(this.id, scheduleClassData).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/admin/schedule-classes']);
          },
          error: (error) => {
            this.error = 'Error updating schedule class';
            this.loading = false;
            console.error('Error:', error);
          }
        });
      } else {
        this.scheduleClassService.create(scheduleClassData).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/admin/schedule-classes']);
          },
          error: (error) => {
            this.error = 'Error creating schedule class';
            this.loading = false;
            console.error('Error:', error);
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.scheduleClassForm.controls).forEach(key => {
      const control = this.scheduleClassForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.scheduleClassForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.scheduleClassForm.get(fieldName);
    if (field?.errors?.['required']) {
      return 'This field is required';
    }
    if (field?.errors?.['minlength']) {
      return `Minimum length is ${field.errors?.['minlength'].requiredLength} characters`;
    }
    return '';
  }

  onCancel(): void {
    this.router.navigate(['/admin/schedule-classes']);
  }
}