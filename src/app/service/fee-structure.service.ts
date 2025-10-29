import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeeStructure } from '../model/payment.models';


@Injectable({
  providedIn: 'root'
})
export class FeeStructureService {
  private apiUrl = 'http://localhost:8080/api/fee-structures';

  constructor(private http: HttpClient) { }

  getAllFeeStructures(): Observable<FeeStructure[]> {
    return this.http.get<FeeStructure[]>(this.apiUrl);
  }

  getFeeStructureById(id: number): Observable<FeeStructure> {
    return this.http.get<FeeStructure>(`${this.apiUrl}/${id}`);
  }

  createFeeStructure(feeStructure: FeeStructure): Observable<FeeStructure> {
    return this.http.post<FeeStructure>(this.apiUrl, feeStructure);
  }

  updateFeeStructure(id: number, feeStructure: FeeStructure): Observable<FeeStructure> {
    return this.http.put<FeeStructure>(`${this.apiUrl}/${id}`, feeStructure);
  }

  deleteFeeStructure(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}