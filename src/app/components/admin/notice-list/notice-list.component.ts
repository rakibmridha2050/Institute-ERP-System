import { Component, OnInit } from '@angular/core';
import { Notice, NoticeType } from 'src/app/model/notice.model';
import { NoticeService } from 'src/app/service/notice.service';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.scss']
})
export class NoticeListComponent implements OnInit {
  notices: Notice[] = [];
  filteredNotices: Notice[] = [];
  isLoading = true;
  error = '';
  searchTerm = '';
  selectedType = 'ALL';
  
  noticeTypes = [
    { value: 'ALL', label: 'All Types' },
    { value: NoticeType.GENERAL, label: 'General' },
    { value: NoticeType.EXAM, label: 'Exam' },
    { value: NoticeType.EVENT, label: 'Event' },
    { value: NoticeType.HOLIDAY, label: 'Holiday' },
    { value: NoticeType.URGENT, label: 'Urgent' },
    { value: NoticeType.ACADEMIC, label: 'Academic' }
  ];

  constructor(private noticeService: NoticeService) { }

  ngOnInit(): void {
    this.loadNotices();
  }

  loadNotices(): void {
    this.isLoading = true;
    this.noticeService.getPublishedNotices().subscribe({
      next: (data) => {
        this.notices = data;
        this.filteredNotices = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error loading notices';
        this.isLoading = false;
        console.error('Error loading notices:', error);
      }
    });
  }

  filterNotices(): void {
    let filtered = this.notices;

    // Filter by search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(notice =>
        notice.title.toLowerCase().includes(term) ||
        notice.content.toLowerCase().includes(term)
      );
    }

    // Filter by notice type
    if (this.selectedType !== 'ALL') {
      filtered = filtered.filter(notice => notice.noticeType === this.selectedType);
    }

    this.filteredNotices = filtered;
  }

  onTypeChange(): void {
    this.filterNotices();
  }

  deleteNotice(id: number): void {
    if (confirm('Are you sure you want to delete this notice?')) {
      this.noticeService.deleteNotice(id).subscribe({
        next: () => {
          this.notices = this.notices.filter(n => n.id !== id);
          this.filteredNotices = this.filteredNotices.filter(n => n.id !== id);
        },
        error: (error) => {
          console.error('Error deleting notice:', error);
          alert('Error deleting notice');
        }
      });
    }
  }

  getNoticeTypeBadgeClass(type: string): string {
    switch (type) {
      case NoticeType.URGENT:
        return 'bg-danger';
      case NoticeType.EXAM:
        return 'bg-warning text-dark';
      case NoticeType.HOLIDAY:
        return 'bg-success';
      case NoticeType.EVENT:
        return 'bg-info';
      case NoticeType.ACADEMIC:
        return 'bg-primary';
      default:
        return 'bg-secondary';
    }
  }

  isExpired(expiryDate: string | undefined): boolean {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
