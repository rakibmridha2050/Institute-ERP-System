import { AttendanceStatus } from './attendance-status.enum';

export interface AttendanceResponse {
  id: number;
  enrollmentId: number;
  studentName: string;
  facultyId: number;
  facultyName: string;
  classId?: number;
  className?: string;
  sectionId?: number;
  sectionName?: string;
  attendanceDate: string;
  status: AttendanceStatus;
}
export interface AttendanceRequestDTO {
  studentId: number;
  courseId: number;
  sectionId: number;
  attendanceDate: string;
  status: string; // Use string instead of AttendanceStatus enum
  remarks?: string;
  recordedBy: string;
  periodNumber?: number;
  [key: string]: any; // Allow additional properties
}
export interface Attendance {
  id?: number;
  studentId: number;
  studentName?: string;
  courseId: number;
  courseName?: string;
  sectionId: number;
  sectionName?: string;
  attendanceDate: string;
  status: AttendanceStatus;
  remarks?: string;
  recordedBy: string;
  periodNumber?: number;
  createdAt?: string;
  updatedAt?: string;
}

