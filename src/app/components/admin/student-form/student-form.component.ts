import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Classes } from 'src/app/model/classes.model';
import { Course } from 'src/app/model/course.model';
import { Department } from 'src/app/model/department.model';
import { Section } from 'src/app/model/section.model';
import { StudentResponseDTO, StudentDTO } from 'src/app/model/student.model';
import { ClassesServiceService } from 'src/app/service/classes-service.service';
import { CourseService } from 'src/app/service/course.service';
import { DepartmentService } from 'src/app/service/department.service';
import { SectionService } from 'src/app/service/section.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEdit = false;
  studentId?: number;
  loading = false;
  submitting = false;

  departments: Department[] = [];
  classes: Classes[] = [];
  sections: Section[] = [];
  courses: Course[] = [];
  selectedCourses: number[] = [];

  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' }
  ];

  semesterOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private departmentService: DepartmentService,
    private classService: ClassesServiceService,
    private sectionService: SectionService,
    private courseService: CourseService
  ) {
    this.studentForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadDropdownData();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.studentId = +params['id'];
        this.loadStudent(this.studentId);
      }
    });

    this.setupFormListeners();
  }

  createForm(): FormGroup {
    return this.fb.group({
      studentId: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(?:\+88)?01[3-9]\d{8}$/)]],
      dob: [null, Validators.required],
      gender: ['', Validators.required],
      program: ['', Validators.required],
      currentSemester: [1, [Validators.required, Validators.min(1)]],
      permanentAddress: [''],
      presentAddress: [''],
      isActive: [true],
      departmentId: [null, Validators.required],
      classId: [null],
      sectionId: [null],
      courseIds: [[]]
    });
  }

  setupFormListeners(): void {
    this.studentForm.get('departmentId')?.valueChanges.subscribe(deptId => {
      if (deptId) {
        this.loadClassesByDepartment(deptId);
        this.loadCoursesByDepartment(deptId);
      } else {
        this.classes = [];
        this.sections = [];
        this.courses = [];
        this.studentForm.patchValue({ classId: null, sectionId: null, courseIds: [] });
      }
    });

    this.studentForm.get('classId')?.valueChanges.subscribe(classId => {
      if (classId) {
        this.loadSectionsByClass(classId);
      } else {
        this.sections = [];
        this.studentForm.patchValue({ sectionId: null });
      }
    });
  }

  loadDropdownData(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (departments) => this.departments = departments,
      error: (error) => console.error('Failed to load departments:', error)
    });
  }

  loadClassesByDepartment(departmentId: number): void {
    this.classService.getClassesByDepartment(departmentId).subscribe({
      next: (classes) => this.classes = classes,
      error: (error) => console.error('Failed to load classes:', error)
    });
  }

  loadSectionsByClass(classId: number): void {
    this.sectionService.getSectionsByClassId(classId).subscribe({
      next: (sections) => this.sections = sections,
      error: (error) => console.error('Failed to load sections:', error)
    });
  }
  onCourseSelectionChange(courseId: number, event: any): void {
  const isChecked = event.target.checked;
  const currentCourseIds = this.studentForm.get('courseIds')?.value || [];
  
  if (isChecked) {
    // Add course ID if checked
    this.studentForm.patchValue({
      courseIds: [...currentCourseIds, courseId]
    });
  } else {
    // Remove course ID if unchecked
    this.studentForm.patchValue({
      courseIds: currentCourseIds.filter((id: number) => id !== courseId)
    });
  }
}

  loadCoursesByDepartment(departmentId: number): void {
    this.courseService.getCoursesByDepartment(departmentId).subscribe({
      next: (courses) => this.courses = courses,
      error: (error) => console.error('Failed to load courses:', error)
    });
  }

  loadStudent(id: number): void {
    this.loading = true;
    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        this.populateForm(student);
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load student:', error);
        this.loading = false;
      }
    });
  }

  populateForm(student: StudentResponseDTO): void {
    this.studentForm.patchValue({
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      phone: student.phone,
      dob: new Date(student.dob),
      gender: student.gender,
      program: student.program,
      currentSemester: student.currentSemester,
      permanentAddress: student.permanentAddress,
      presentAddress: student.presentAddress,
      isActive: student.isActive
    });

    // Note: You'll need to adjust department/class/section loading based on your API response
    // This is a simplified version - you might need additional API calls to get IDs
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.submitting = true;
    const studentDTO: StudentDTO = this.studentForm.value;

    // Convert date to proper format
    if (studentDTO.dob) {
      studentDTO.dob = new Date(studentDTO.dob);
    }

    if (this.isEdit && this.studentId) {
      this.updateStudent(studentDTO);
    } else {
      this.createStudent(studentDTO);
    }
  }

  createStudent(studentDTO: StudentDTO): void {
    this.studentService.createStudent(studentDTO).subscribe({
      next: (student) => {
        alert('Student created successfully');
        this.router.navigate(['/admin/students']);
      },
      error: (error) => {
        console.error('Failed to create student:', error);
        alert('Failed to create student');
        this.submitting = false;
      }
    });
  }

  updateStudent(studentDTO: StudentDTO): void {
    if (!this.studentId) return;

    this.studentService.updateStudent(this.studentId, studentDTO).subscribe({
      next: (student) => {
        alert('Student updated successfully');
        this.router.navigate(['/admin/students']);
      },
      error: (error) => {
        console.error('Failed to update student:', error);
        alert('Failed to update student');
        this.submitting = false;
      }
    });
  }

  markFormGroupTouched(): void {
    Object.keys(this.studentForm.controls).forEach(key => {
      this.studentForm.get(key)?.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/students']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.studentForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.studentForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'This field is required';
      if (field.errors['email']) return 'Invalid email format';
      if (field.errors['pattern']) return 'Invalid format';
      if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
    }
    return '';
  }
}
