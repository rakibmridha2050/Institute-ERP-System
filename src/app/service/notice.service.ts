import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Notice } from '../model/notice.model';


@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private apiUrl = `${environment.apiUrl}/notices`;

  constructor(private http: HttpClient) { }

  // Get all published notices
  getPublishedNotices(): Observable<Notice[]> {
    return this.http.get<Notice[]>(`${this.apiUrl}/published`);
  }

  // Create new notice
  createNotice(notice: Notice): Observable<Notice> {
    return this.http.post<Notice>(this.apiUrl, notice);
  }

  // Delete notice
  deleteNotice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get notice by ID (you might want to add this to your backend)
  getNoticeById(id: number): Observable<Notice> {
    return this.http.get<Notice>(`${this.apiUrl}/${id}`);
  }

  // Update notice (you might want to add this to your backend)
  updateNotice(id: number, notice: Notice): Observable<Notice> {
    return this.http.put<Notice>(`${this.apiUrl}/${id}`, notice);
  }
}