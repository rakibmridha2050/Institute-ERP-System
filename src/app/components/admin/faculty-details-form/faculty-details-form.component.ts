import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty } from 'src/app/model/faculty.model';
import { FacultyDetailsService } from 'src/app/service/faculty-details.service';
import { FacultyService } from 'src/app/service/faculty.service';

@Component({
  selector: 'app-faculty-details-form',
  templateUrl: './faculty-details-form.component.html',
  styleUrls: ['./faculty-details-form.component.scss']
})
export class FacultyDetailsFormComponent implements OnInit {
  facultyDetailsForm: FormGroup;
  isEditMode = false;
  loading = false;
  submitting = false;
  error = '';
  faculties: Faculty[] = [];
  selectedFaculty: Faculty | null = null;

  // Options for dropdowns
  genders = ['Male', 'Female', 'Other'];
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
  salaryScales = ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private facultyDetailsService: FacultyDetailsService,
    private facultyService: FacultyService
  ) {
    this.facultyDetailsForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadFaculties();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadFacultyDetails(Number(id));
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      facultyId: ['', Validators.required],
      employeeId: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{4}-\d{3}$/)]],
      dateOfBirth: [''],
      gender: [''],
      bloodGroup: [''],
      nationalId: [''],
      passportNumber: [''],
      
      // Address
      streetAddress: [''],
      city: [''],
      state: [''],
      country: [''],
      postalCode: [''],
      
      // Emergency contact
      emergencyContact: [''],
      emergencyContactRelationship: [''],
      emergencyContactPhone: [''],
      
      // Bank details
      bankAccountNumber: [''],
      bankName: [''],
      bankBranch: [''],
      
      // Professional details
      joiningDate: ['', Validators.required],
      qualification: [''],
      specialization: [''],
      experienceYears: [0, [Validators.min(0)]],
      salaryScale: [''],
      currentSalary: [0, [Validators.min(0)]],
      
      // Personal details
      maritalStatus: [''],
      spouseName: [''],
      
      // Documents
      profilePictureUrl: [''],
      cvDocumentUrl: [''],
      otherDocumentsUrls: [''],
      
      // Additional information
      bio: [''],
      researchInterests: [''],
      publications: [''],
      awardsAchievements: ['']
    });
  }

  loadFaculties(): void {
    this.facultyService.getAllFaculty().subscribe({
      next: (faculties) => {
        this.faculties = faculties;
      },
      error: (error) => {
        this.error = 'Error loading faculties';
        console.error('Error:', error);
      }
    });
  }

  loadFacultyDetails(id: number): void {
    this.loading = true;
    this.facultyDetailsService.getFacultyDetailsById(id).subscribe({
      next: (details) => {
        this.facultyDetailsForm.patchValue({
          ...details,
          facultyId: details.facultyId
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading faculty details';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onFacultySelect(facultyId: number): void {
    this.selectedFaculty = this.faculties.find(f => f.id === facultyId) || null;
  }

  onSubmit(): void {
    if (this.facultyDetailsForm.valid) {
      this.submitting = true;
      const formData = this.facultyDetailsForm.value;

      if (this.isEditMode) {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.facultyDetailsService.updateFacultyDetails(id, formData).subscribe({
          next: () => {
            this.submitting = false;
            this.router.navigate(['/faculty-details']);
          },
          error: (error) => {
            this.error = 'Error updating faculty details';
            this.submitting = false;
            console.error('Error:', error);
          }
        });
      } else {
        this.facultyDetailsService.createFacultyDetails(formData).subscribe({
          next: () => {
            this.submitting = false;
            this.router.navigate(['/faculty-details']);
          },
          error: (error) => {
            this.error = 'Error creating faculty details';
            this.submitting = false;
            console.error('Error:', error);
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.facultyDetailsForm.controls).forEach(key => {
      const control = this.facultyDetailsForm.get(key);
      control?.markAsTouched();
    });
  }

  get f() {
    return this.facultyDetailsForm.controls;
  }
}
