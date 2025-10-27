import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacultyDetails } from 'src/app/model/faculty-details.model';
import { FacultyDetailsService } from 'src/app/service/faculty-details.service';

@Component({
  selector: 'app-faculty-details-list',
  templateUrl: './faculty-details-list.component.html',
  styleUrls: ['./faculty-details-list.component.scss']
})
export class FacultyDetailsListComponent implements OnInit {
  facultyDetails: any[] = [];
  facultyForm!: FormGroup;
  loading = false;
  error = '';
  submitting = false;
  showForm = false;
  editMode = false;
  selectedFacultyId: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFacultyDetails();
  }

  initForm() {
    this.facultyForm = this.fb.group({
      facultyName: ['', Validators.required],
      facultyEmail: ['', [Validators.required, Validators.email]],
      employeeId: ['', Validators.required],
      department: [''],
      designation: [''],
      experienceYears: [0],
      joiningDate: [''],
    });
  }

  loadFacultyDetails() {
    this.loading = true;
    // Simulated API
    setTimeout(() => {
      this.facultyDetails = [
        {
          id: 1,
          employeeId: 'FAC-2024-001',
          facultyName: 'Dr. John Smith',
          facultyEmail: 'john.smith@university.edu',
          department: 'Computer Science',
          designation: 'Professor',
          experienceYears: 10,
          joiningDate: '2015-08-12',
        },
      ];
      this.loading = false;
    }, 1000);
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }

  editFaculty(details: any) {
    this.showForm = true;
    this.editMode = true;
    this.selectedFacultyId = details.id;
    this.facultyForm.patchValue(details);
  }

  cancelForm() {
    this.resetForm();
    this.showForm = false;
  }

  resetForm() {
    this.facultyForm.reset();
    this.editMode = false;
    this.selectedFacultyId = null;
  }

  onSubmit() {
    if (this.facultyForm.invalid) return;
    this.submitting = true;

    setTimeout(() => {
      if (this.editMode) {
        const index = this.facultyDetails.findIndex(f => f.id === this.selectedFacultyId);
        this.facultyDetails[index] = { id: this.selectedFacultyId, ...this.facultyForm.value };
      } else {
        this.facultyDetails.push({ id: Date.now(), ...this.facultyForm.value });
      }
      this.submitting = false;
      this.showForm = false;
      this.resetForm();
    }, 1000);
  }

  deleteFacultyDetails(id: number) {
    this.facultyDetails = this.facultyDetails.filter(f => f.id !== id);
  }
}