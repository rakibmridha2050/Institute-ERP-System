import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import {  Attendance, AttendanceRequestDTO } from '../model/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
 private apiUrl = 'http://localhost:8080/api/attendances';



  constructor(private http: HttpClient) { }

  // Single attendance
  createAttendance(attendance: AttendanceRequestDTO): Observable<Attendance> {
    return this.http.post<Attendance>(this.apiUrl, attendance);
  }

  // Bulk attendance - this matches your API
  createBulkAttendance(attendanceRequests: AttendanceRequestDTO[]): Observable<Attendance[]> {
    return this.http.post<Attendance[]>(`${this.apiUrl}/bulk`, attendanceRequests);
  }

  // Get attendance by section and date
  getAttendanceBySectionAndDate(sectionId: number, date?: string): Observable<Attendance[]> {
    let params = new HttpParams();
    if (date) {
      params = params.set('date', date);
    }
    return this.http.get<Attendance[]>(`${this.apiUrl}/section/${sectionId}`, { params });
  }

}
