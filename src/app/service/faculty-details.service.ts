import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { FacultyDetailsRequest, FacultyDetails } from '../model/faculty-details.model';


@Injectable({
  providedIn: 'root'
})
export class FacultyDetailsService {
  private apiUrl = `${environment.apiUrl}/faculty-details`;

  constructor(private http: HttpClient) { }

  createFacultyDetails(facultyDetails: FacultyDetailsRequest): Observable<FacultyDetails> {
    return this.http.post<FacultyDetails>(this.apiUrl, facultyDetails);
  }

  getFacultyDetailsById(id: number): Observable<FacultyDetails> {
    return this.http.get<FacultyDetails>(`${this.apiUrl}/${id}`);
  }

  getFacultyDetailsByFacultyId(facultyId: number): Observable<FacultyDetails> {
    return this.http.get<FacultyDetails>(`${this.apiUrl}/faculty/${facultyId}`);
  }

  getAllFacultyDetails(): Observable<FacultyDetails[]> {
    return this.http.get<FacultyDetails[]>(this.apiUrl);
  }

  getFacultyDetailsByDepartment(departmentId: number): Observable<FacultyDetails[]> {
    return this.http.get<FacultyDetails[]>(`${this.apiUrl}/department/${departmentId}`);
  }

  updateFacultyDetails(id: number, facultyDetails: FacultyDetailsRequest): Observable<FacultyDetails> {
    return this.http.put<FacultyDetails>(`${this.apiUrl}/${id}`, facultyDetails);
  }

  deleteFacultyDetails(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  permanentDeleteFacultyDetails(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/permanent/${id}`);
  }
}