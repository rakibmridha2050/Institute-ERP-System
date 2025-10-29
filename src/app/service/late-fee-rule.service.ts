import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LateFeeRule } from '../model/payment.models';

@Injectable({
  providedIn: 'root'
})
export class LateFeeRuleService {
  private apiUrl = 'http://localhost:8080/api/late-fee-rules';

  constructor(private http: HttpClient) { }

  getAllLateFeeRules(): Observable<LateFeeRule[]> {
    return this.http.get<LateFeeRule[]>(this.apiUrl);
  }

  getLateFeeRuleById(id: number): Observable<LateFeeRule> {
    return this.http.get<LateFeeRule>(`${this.apiUrl}/${id}`);
  }

  getActiveLateFeeRules(): Observable<LateFeeRule[]> {
    return this.http.get<LateFeeRule[]>(`${this.apiUrl}/active`);
  }

  createLateFeeRule(rule: LateFeeRule): Observable<LateFeeRule> {
    return this.http.post<LateFeeRule>(this.apiUrl, rule);
  }

  updateLateFeeRule(id: number, rule: LateFeeRule): Observable<LateFeeRule> {
    return this.http.put<LateFeeRule>(`${this.apiUrl}/${id}`, rule);
  }

  toggleLateFeeRuleStatus(id: number): Observable<LateFeeRule> {
    return this.http.patch<LateFeeRule>(`${this.apiUrl}/${id}/toggle-status`, {});
  }

  deleteLateFeeRule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  calculateLateFee(originalAmount: number, daysLate: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/calculate-late-fee?originalAmount=${originalAmount}&daysLate=${daysLate}`);
  }
}