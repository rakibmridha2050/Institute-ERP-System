import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentFee } from '../model/payment.models';


@Injectable({
  providedIn: 'root'
})
export class StudentFeeService {
  private apiUrl = 'http://localhost:8080/api/student-fees';

  constructor(private http: HttpClient) { }

  getAllStudentFees(): Observable<StudentFee[]> {
    return this.http.get<StudentFee[]>(this.apiUrl);
  }

  getStudentFeeById(id: number): Observable<StudentFee> {
    return this.http.get<StudentFee>(`${this.apiUrl}/${id}`);
  }

  getStudentFeesByStudentId(studentId: number): Observable<StudentFee[]> {
    return this.http.get<StudentFee[]>(`${this.apiUrl}/student/${studentId}`);
  }

  generateFeeInvoice(studentFee: StudentFee): Observable<StudentFee> {
    return this.http.post<StudentFee>(this.apiUrl, studentFee);
  }

  getOverdueInvoices(): Observable<StudentFee[]> {
    return this.http.get<StudentFee[]>(`${this.apiUrl}/overdue`);
  }

  applyLateFee(id: number, lateFeeAmount: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/apply-late-fee?lateFeeAmount=${lateFeeAmount}`, {});
  }
}