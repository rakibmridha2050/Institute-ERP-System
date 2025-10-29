import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeeWaiver } from '../model/payment.models';

@Injectable({
  providedIn: 'root'
})
export class FeeWaiverService {
  private apiUrl = 'http://localhost:8080/api/fee-waivers';

  constructor(private http: HttpClient) { }

  getAllFeeWaivers(): Observable<FeeWaiver[]> {
    return this.http.get<FeeWaiver[]>(this.apiUrl);
  }

  getFeeWaiverById(id: number): Observable<FeeWaiver> {
    return this.http.get<FeeWaiver>(`${this.apiUrl}/${id}`);
  }

  getFeeWaiversByStudentId(studentId: number): Observable<FeeWaiver[]> {
    return this.http.get<FeeWaiver[]>(`${this.apiUrl}/student/${studentId}`);
  }

  createFeeWaiver(waiver: FeeWaiver): Observable<FeeWaiver> {
    return this.http.post<FeeWaiver>(this.apiUrl, waiver);
  }

  updateFeeWaiver(id: number, waiver: FeeWaiver): Observable<FeeWaiver> {
    return this.http.put<FeeWaiver>(`${this.apiUrl}/${id}`, waiver);
  }

  approveFeeWaiver(id: number, approvedBy: string): Observable<FeeWaiver> {
    return this.http.post<FeeWaiver>(`${this.apiUrl}/${id}/approve?approvedBy=${approvedBy}`, {});
  }

  rejectFeeWaiver(id: number, rejectedBy: string): Observable<FeeWaiver> {
    return this.http.post<FeeWaiver>(`${this.apiUrl}/${id}/reject?rejectedBy=${rejectedBy}`, {});
  }

  deleteFeeWaiver(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}