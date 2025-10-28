import { Component, OnInit } from '@angular/core';
import { ScheduleClass } from 'src/app/model/schedule-class.model';
import { ScheduleClassService } from 'src/app/service/schedule-class.service';

@Component({
  selector: 'app-schedule-class-list',
  templateUrl: './schedule-class-list.component.html',
  styleUrls: ['./schedule-class-list.component.scss']
})
export class ScheduleClassListComponent implements OnInit {
  scheduleClasses: ScheduleClass[] = [];
  loading = false;
  error = '';

  constructor(private scheduleClassService: ScheduleClassService) { }

  ngOnInit(): void {
    this.loadScheduleClasses();
  }

  loadScheduleClasses(): void {
    this.loading = true;
    this.scheduleClassService.getAll().subscribe({
      next: (data) => {
        this.scheduleClasses = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading schedule classes';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  deleteScheduleClass(id: number): void {
    if (confirm('Are you sure you want to delete this schedule class?')) {
      this.scheduleClassService.delete(id).subscribe({
        next: () => {
          this.scheduleClasses = this.scheduleClasses.filter(sc => sc.id !== id);
        },
        error: (error) => {
          this.error = 'Error deleting schedule class';
          console.error('Error:', error);
        }
      });
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'badge bg-success';
      case 'inactive':
        return 'badge bg-secondary';
      default:
        return 'badge bg-primary';
    }
  }
}