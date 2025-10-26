import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticeType, Notice } from 'src/app/model/notice.model';
import { NoticeService } from 'src/app/service/notice.service';

@Component({
  selector: 'app-notice-form',
  templateUrl: './notice-form.component.html',
  styleUrls: ['./notice-form.component.scss']
})
export class NoticeFormComponent implements OnInit {
  noticeForm: FormGroup;
  isEdit = false;
  noticeId?: number;
  isLoading = false;
  error = '';
  isSubmitting = false;

  noticeTypes = [
    { value: NoticeType.GENERAL, label: 'General' },
    { value: NoticeType.EXAM, label: 'Exam' },
    { value: NoticeType.EVENT, label: 'Event' },
    { value: NoticeType.HOLIDAY, label: 'Holiday' },
    { value: NoticeType.URGENT, label: 'Urgent' },
    { value: NoticeType.ACADEMIC, label: 'Academic' }
  ];

  constructor(
    private fb: FormBuilder,
    private noticeService: NoticeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.noticeForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.noticeId = +params['id'];
        this.loadNotice(this.noticeId);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      noticeType: [NoticeType.GENERAL, Validators.required],
      isPublished: [true],
      publishDate: [this.getCurrentDateTime()],
      expiryDate: [''],
      departmentId: [''],
      classId: [''],
      sectionId: [''],
      courseId: [''],
      postedById: [1] // Default to current user ID
    });
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
  }

  loadNotice(id: number): void {
    this.isLoading = true;
    this.noticeService.getNoticeById(id).subscribe({
      next: (notice) => {
        // Format dates for datetime-local input
        const formattedNotice = {
          ...notice,
          publishDate: this.formatDateForInput(notice.publishDate),
          expiryDate: notice.expiryDate ? this.formatDateForInput(notice.expiryDate) : ''
        };
        this.noticeForm.patchValue(formattedNotice);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error loading notice';
        this.isLoading = false;
        console.error('Error loading notice:', error);
      }
    });
  }

  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  }

  onSubmit(): void {
    if (this.noticeForm.valid) {
      this.isSubmitting = true;
      const noticeData: Notice = this.noticeForm.value;

      // Convert empty strings to null for optional fields
      if (!noticeData.expiryDate) noticeData.expiryDate = undefined;
      if (!noticeData.departmentId) noticeData.departmentId = undefined;
      if (!noticeData.classId) noticeData.classId = undefined;
      if (!noticeData.sectionId) noticeData.sectionId = undefined;
      if (!noticeData.courseId) noticeData.courseId = undefined;

      if (this.isEdit && this.noticeId) {
        this.noticeService.updateNotice(this.noticeId, noticeData).subscribe({
          next: () => {
            this.router.navigate(['/admin/notices']);
          },
          error: (error) => {
            this.handleError(error, 'updating');
          }
        });
      } else {
        this.noticeService.createNotice(noticeData).subscribe({
          next: () => {
            this.router.navigate(['/admin/notices']);
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
    this.error = `Error ${action} notice`;
    this.isSubmitting = false;
    console.error(`Error ${action} notice:`, error);
    
    if (error.error && error.error.message) {
      this.error += `: ${error.error.message}`;
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.noticeForm.controls).forEach(key => {
      const control = this.noticeForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin/notices']);
  }

  // Getters for easy access in template
  get title() { return this.noticeForm.get('title'); }
  get content() { return this.noticeForm.get('content'); }
  get noticeType() { return this.noticeForm.get('noticeType'); }
  get publishDate() { return this.noticeForm.get('publishDate'); }
}
