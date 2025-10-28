// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router, ActivatedRoute } from '@angular/router';
// import { AttendanceStatus } from 'src/app/model/attendance-status.enum';
// import { AttendanceResponse, AttendanceRequest } from 'src/app/model/attendance.model';
// import { AttendanceService } from 'src/app/service/attendance.service';

// @Component({
//   selector: 'app-attendance-form',
//   templateUrl: './attendance-form.component.html',
//   styleUrls: ['./attendance-form.component.scss']
// })
// export class AttendanceFormComponent implements OnInit {
//   form!: FormGroup;
//   isEdit = false;
//   id?: number;
//   loading = false;
//   error = '';
//   statuses = Object.values(AttendanceStatus);

//   constructor(
//     private fb: FormBuilder,
//     private attendanceService: AttendanceService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.form = this.fb.group({
//       enrollmentId: ['', Validators.required],
//       facultyId: ['', Validators.required],
//       classId: [''],
//       sectionId: [''],
//       attendanceDate: [''],
//       status: ['', Validators.required]
//     });

//     this.id = Number(this.route.snapshot.paramMap.get('id'));
//     if (this.id) {
//       this.isEdit = true;
//       this.loadAttendance();
//     }
//   }

//   loadAttendance() {
//     this.loading = true;
//     this.attendanceService.getById(this.id!).subscribe({
//       next: (data: AttendanceResponse) => {
//         this.form.patchValue(data);
//         this.loading = false;
//       },
//       error: () => {
//         this.error = 'Failed to load attendance record.';
//         this.loading = false;
//       }
//     });
//   }

//   onSubmit() {
//     if (this.form.invalid) return;

//     const request: AttendanceRequest = this.form.value;
//     this.loading = true;

//     const request$ = this.isEdit
//       ? this.attendanceService.update(this.id!, request)
//       : this.attendanceService.create(request);

//     request$.subscribe({
//       next: () => this.router.navigate(['/admin/attendances']),
//       error: () => {
//         this.error = 'Operation failed.';
//         this.loading = false;
//       }
//     });
//   }

//   onCancel() {
//     this.router.navigate(['/admin/attendances']);
//   }
// }
