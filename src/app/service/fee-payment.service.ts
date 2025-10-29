import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeePayment } from '../model/payment.models';

@Injectable({
  providedIn: 'root'
})
export class FeePaymentService {
  private apiUrl = 'http://localhost:8080/api/fee-payments';

  constructor(private http: HttpClient) { }

  getAllPayments(): Observable<FeePayment[]> {
    return this.http.get<FeePayment[]>(this.apiUrl);
  }

  getPaymentById(id: number): Observable<FeePayment> {
    return this.http.get<FeePayment>(`${this.apiUrl}/${id}`);
  }

  getPaymentsByStudentFee(studentFeeId: number): Observable<FeePayment[]> {
    return this.http.get<FeePayment[]>(`${this.apiUrl}/student-fee/${studentFeeId}`);
  }

  getPaymentsByStudent(studentId: number): Observable<FeePayment[]> {
    return this.http.get<FeePayment[]>(`${this.apiUrl}/student/${studentId}`);
  }

  createPayment(payment: FeePayment): Observable<FeePayment> {
    return this.http.post<FeePayment>(this.apiUrl, payment);
  }

  updatePaymentStatus(id: number, status: string): Observable<FeePayment> {
    return this.http.patch<FeePayment>(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }
}