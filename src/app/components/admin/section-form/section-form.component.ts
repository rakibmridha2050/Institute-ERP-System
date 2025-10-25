import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesDTO } from 'src/app/model/classes.model';
import { SectionCreateDTO } from 'src/app/model/section.model';
import { ClassesServiceService } from 'src/app/service/classes-service.service';
import { SectionService } from 'src/app/service/section.service';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {
  sectionForm: FormGroup;
  classes: ClassesDTO[] = [];
  isEditMode = false;
  sectionId: number | null = null;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private sectionService: SectionService,
    private classesService: ClassesServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.sectionForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadClasses();
    this.checkEditMode();
  }

  createForm(): FormGroup {
    return this.fb.group({
      sectionName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      classId: ['', [Validators.required]]
    });
  }

  checkEditMode(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.sectionId = +id;
        this.loadSectionForEdit(this.sectionId);
      }
    });
  }

  loadClasses(): void {
    this.isLoading = true;
    this.classesService.getAllActiveClasses().subscribe({
      next: (classes) => {
        this.classes = classes;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load classes';
        this.isLoading = false;
        console.error('Error loading classes:', error);
      }
    });
  }

  loadSectionForEdit(id: number): void {
    this.isLoading = true;
    this.sectionService.getSectionById(id).subscribe({
      next: (sectionData) => {
        this.sectionForm.patchValue({
          sectionName: sectionData.sectionName,
          classId: sectionData.classInfo?.id
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load section data';
        this.isLoading = false;
        console.error('Error loading section:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.sectionForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      
      const formData: SectionCreateDTO = {
        sectionName: this.sectionForm.get('sectionName')?.value.trim(),
        classId: this.sectionForm.get('classId')?.value
      };

      if (this.isEditMode && this.sectionId) {
        // Update existing section
        this.sectionService.updateSection(this.sectionId, formData).subscribe({
          next: () => {
            this.successMessage = 'Section updated successfully';
            setTimeout(() => this.router.navigate(['/admin/sections']), 1500);
          },
          error: (error) => {
            this.handleError('Failed to update section', error);
          }
        });
      } else {
        // Create new section
        this.sectionService.createSection(formData).subscribe({
          next: () => {
            this.successMessage = 'Section created successfully';
            setTimeout(() => this.router.navigate(['/admin/sections']), 1500);
          },
          error: (error) => {
            this.handleError('Failed to create section', error);
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private handleError(message: string, error: any): void {
    this.errorMessage = error.error?.message || message;
    this.isSubmitting = false;
    console.error('Error:', error);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.sectionForm.controls).forEach(key => {
      this.sectionForm.get(key)?.markAsTouched();
    });
  }

  // Getters for easy access in template
  get sectionName() { return this.sectionForm.get('sectionName'); }
  get classId() { return this.sectionForm.get('classId'); }

  onCancel(): void {
    this.router.navigate(['/admin/sections']);
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}