import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty } from 'src/app/model/faculty.model';
import { FacultyService } from 'src/app/service/faculty.service';


@Component({
  selector: 'app-faculty-form',
  templateUrl: './faculty-form.component.html',
  styleUrls: ['./faculty-form.component.scss']
})
export class FacultyFormComponent implements OnInit {
  facultyForm: FormGroup;
  isEdit = false;
  facultyId?: number;
  isLoading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private facultyService: FacultyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.facultyForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.facultyId = +params['id'];
        this.loadFaculty(this.facultyId);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      designation: ['', Validators.required],
      userId: ['', [Validators.required, Validators.min(1)]],
      departmentId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  loadFaculty(id: number): void {
    this.isLoading = true;
    this.facultyService.getFacultyById(id).subscribe({
      next: (faculty) => {
        this.facultyForm.patchValue(faculty);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error loading faculty';
        this.isLoading = false;
        console.error('Error loading faculty:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.facultyForm.valid) {
      this.isLoading = true;
      const facultyData: Faculty = this.facultyForm.value;

      if (this.isEdit && this.facultyId) {
        facultyData.id = this.facultyId;
        this.facultyService.updateFaculty(this.facultyId, facultyData).subscribe({
          next: () => {
            this.router.navigate(['/admin/faculty']);
          },
          error: (error) => {
            this.handleError(error, 'updating');
          }
        });
      } else {
        this.facultyService.createFaculty(facultyData).subscribe({
          next: () => {
            this.router.navigate(['/admin/faculty']);
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
    this.error = `Error ${action} faculty`;
    this.isLoading = false;
    console.error(`Error ${action} faculty:`, error);
    
    if (error.error && error.error.message) {
      this.error += `: ${error.error.message}`;
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.facultyForm.controls).forEach(key => {
      const control = this.facultyForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/faculty']);
  }

  // Getters for easy access in template
  get name() { return this.facultyForm.get('name'); }
  get email() { return this.facultyForm.get('email'); }
  get phone() { return this.facultyForm.get('phone'); }
  get designation() { return this.facultyForm.get('designation'); }
  get userId() { return this.facultyForm.get('userId'); }
  get departmentId() { return this.facultyForm.get('departmentId'); }
}