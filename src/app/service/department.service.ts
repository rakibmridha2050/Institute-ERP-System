import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Department, DepartmentCreateRequest, DepartmentUpdateRequest } from '../model/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private readonly apiUrl = `${environment.apiUrl}/departments`;

  constructor(private http: HttpClient) { }

  // Create new department
  createDepartment(department: DepartmentCreateRequest): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department)
      .pipe(catchError(this.handleError));
  }

  // Get all departments
  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Get department by ID
  getDepartmentById(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Update department
  updateDepartment(id: number, department: DepartmentUpdateRequest): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/${id}`, department)
      .pipe(catchError(this.handleError));
  }

  // Delete department
  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      
      // Specific error messages based on status code
      switch (error.status) {
        case 404:
          errorMessage = 'Department not found';
          break;
        case 409:
          errorMessage = 'Department with this name or code already exists';
          break;
        case 400:
          errorMessage = 'Invalid department data provided';
          break;
        case 500:
          errorMessage = 'Server error occurred. Please try again later.';
          break;
      }
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}