import { Component, OnInit } from '@angular/core';
import { FeePayment } from 'src/app/model/payment.models';
import { FeePaymentService } from 'src/app/service/fee-payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
  payments: FeePayment[] = [];
  loading = false;
  error = '';

  constructor(private feePaymentService: FeePaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading = true;
    this.error = '';
    
    this.feePaymentService.getAllPayments().subscribe({
      next: (data) => {
        this.payments = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load payments';
        this.loading = false;
        console.error('Error loading payments:', error);
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  viewPaymentDetails(payment: FeePayment): void {
    console.log('View payment details:', payment);
    // Implement payment details view
  }

  printReceipt(payment: FeePayment): void {
    console.log('Print receipt for:', payment);
    // Implement print functionality
  }
}