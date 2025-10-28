import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ScheduleClassDTO, ScheduleClass } from '../model/schedule-class.model';


@Injectable({
  providedIn: 'root'
})
export class ScheduleClassService {
  private apiUrl = `${environment.apiUrl}/schedule-classes`;

  constructor(private http: HttpClient) { }

  create(scheduleClass: ScheduleClassDTO): Observable<ScheduleClass> {
    return this.http.post<ScheduleClass>(this.apiUrl, scheduleClass);
  }

  getAll(): Observable<ScheduleClass[]> {
    return this.http.get<ScheduleClass[]>(this.apiUrl);
  }

  getById(id: number): Observable<ScheduleClass> {
    return this.http.get<ScheduleClass>(`${this.apiUrl}/${id}`);
  }

  update(id: number, scheduleClass: ScheduleClassDTO): Observable<ScheduleClass> {
    return this.http.put<ScheduleClass>(`${this.apiUrl}/${id}`, scheduleClass);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}