import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ClassesCreateDTO, ClassesDTO } from '../model/classes.model';

@Injectable({
  providedIn: 'root'
})
export class ClassesServiceService {
  private apiUrl = `${environment.apiUrl}/classes`;

  constructor(private http: HttpClient) { }

  // Create a new class
  createClass(classesData: ClassesCreateDTO): Observable<ClassesDTO> {
    return this.http.post<ClassesDTO>(this.apiUrl, classesData);
  }

  // Get all classes
  getAllClasses(): Observable<ClassesDTO[]> {
    return this.http.get<ClassesDTO[]>(this.apiUrl);
  }

  // Get class by ID
  getClassById(id: number): Observable<ClassesDTO> {
    return this.http.get<ClassesDTO>(`${this.apiUrl}/${id}`);
  }

  // Update class
  updateClass(id: number, classesData: ClassesCreateDTO): Observable<ClassesDTO> {
    return this.http.put<ClassesDTO>(`${this.apiUrl}/${id}`, classesData);
  }

  // Delete class
  deleteClass(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get classes by department
  getClassesByDepartment(departmentId: number): Observable<ClassesDTO[]> {
    return this.http.get<ClassesDTO[]>(`${this.apiUrl}/department/${departmentId}`);
  }

  // Search classes by name
  searchClassesByName(className: string): Observable<ClassesDTO[]> {
    let params = new HttpParams();
    if (className) {
      params = params.set('className', className);
    }
    return this.http.get<ClassesDTO[]>(`${this.apiUrl}/search`, { params });
  }


  // Add this method to get all active classes
  getAllActiveClasses(): Observable<ClassesDTO[]> {
    return this.http.get<ClassesDTO[]>(this.apiUrl);
  }
}
