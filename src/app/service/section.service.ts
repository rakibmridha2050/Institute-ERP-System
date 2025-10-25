// src/app/services/section.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { SectionCreateDTO, SectionDTO } from '../model/section.model';


@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private apiUrl = `${environment.apiUrl}/sections`;

  constructor(private http: HttpClient) { }

  // Create a new section
  createSection(sectionData: SectionCreateDTO): Observable<SectionDTO> {
    return this.http.post<SectionDTO>(this.apiUrl, sectionData);
  }

  // Get all sections
  getAllSections(): Observable<SectionDTO[]> {
  
    
    return this.http.get<SectionDTO[]>(this.apiUrl);
  }

  // Get section by ID
  getSectionById(id: number): Observable<SectionDTO> {
    return this.http.get<SectionDTO>(`${this.apiUrl}/${id}`);
  }

  // Update section
  updateSection(id: number, sectionData: SectionCreateDTO): Observable<SectionDTO> {
    return this.http.put<SectionDTO>(`${this.apiUrl}/${id}`, sectionData);
  }

  // Delete section (soft delete)
  deleteSection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get sections by class ID
  getSectionsByClassId(classId: number): Observable<SectionDTO[]> {
    return this.http.get<SectionDTO[]>(`${this.apiUrl}/by-class/${classId}`);
  }

  // Restore section
  restoreSection(id: number): Observable<SectionDTO> {
    return this.http.post<SectionDTO>(`${this.apiUrl}/${id}/restore`, {});
  }

  // Get all sections including inactive
  getAllSectionsIncludingInactive(): Observable<SectionDTO[]> {
    return this.http.get<SectionDTO[]>(`${this.apiUrl}/all`);
  }
}