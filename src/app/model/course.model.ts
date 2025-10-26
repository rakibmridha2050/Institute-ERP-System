export interface Course {
  id?: number;
  courseCode: string;
  courseName: string;
  credits: number;
  departmentId: number;
  departmentName?: string;
  subjectCount?: number;
  studentCount?: number;
  facultyCount?: number;
  semesterCount?: number;
  facultyIds?: number[];
  studentIds?: number[];
}