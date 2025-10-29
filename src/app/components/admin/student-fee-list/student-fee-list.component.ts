import { Component, OnInit } from '@angular/core';
import { StudentFee } from 'src/app/model/payment.models';
import { StudentFeeService } from 'src/app/service/student-fee.service';

@Component({
  selector: 'app-student-fee-list',
  templateUrl: './student-fee-list.component.html',
  styleUrls: ['./student-fee-list.component.scss']
})
export class StudentFeeListComponent implements OnInit {
  studentFees: StudentFee[] = [];
  loading = false;
  error = '';

  constructor(private studentFeeService: StudentFeeService) {}

  ngOnInit(): void {
    this.loadStudentFees();
  }

  loadStudentFees(): void {
    this.loading = true;
    this.error = '';
    
    this.studentFeeService.getAllStudentFees().subscribe({
      next: (data) => {
        this.studentFees = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load student fees';
        this.loading = false;
        console.error('Error loading student fees:', error);
      }
    });
  }

  getStatusClass(status: string): string {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'paid') return 'status-badge status-paid';
    if (statusLower === 'pending') return 'status-badge status-pending';
    if (statusLower === 'overdue') return 'status-badge status-overdue';
    return 'status-badge bg-gray-100 text-gray-700';
  }

  viewPayments(studentFee: StudentFee): void {
    console.log('View payments for:', studentFee);
    // Implement navigation to payments view
  }

  makePayment(studentFee: StudentFee): void {
    console.log('Make payment for:', studentFee);
    // Implement payment flow
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-IN');
  }
}