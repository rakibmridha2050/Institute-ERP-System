import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeeComponent } from '../model/payment.models';


@Injectable({
  providedIn: 'root'
})
export class FeeComponentService {
  private apiUrl = 'http://localhost:8080/api/fee-components';

  constructor(private http: HttpClient) { }

  getComponentsByFeeStructure(feeStructureId: number): Observable<FeeComponent[]> {
    return this.http.get<FeeComponent[]>(`${this.apiUrl}/structure/${feeStructureId}`);
  }

  createFeeComponent(feeStructureId: number, component: FeeComponent): Observable<FeeComponent> {
    return this.http.post<FeeComponent>(`${this.apiUrl}/structure/${feeStructureId}`, component);
  }

  updateFeeComponent(id: number, component: FeeComponent): Observable<FeeComponent> {
    return this.http.put<FeeComponent>(`${this.apiUrl}/${id}`, component);
  }

  deleteFeeComponent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}