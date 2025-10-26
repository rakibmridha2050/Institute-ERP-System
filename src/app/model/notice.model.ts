export interface Notice {
  id?: number;
  title: string;
  content: string;
  noticeType: string;
  isPublished: boolean;
  publishDate: string;
  expiryDate?: string;
  departmentId?: number;
  classId?: number;
  sectionId?: number;
  courseId?: number;
  postedById?: number;
  
  // Optional fields for display
  departmentName?: string;
  className?: string;
  sectionName?: string;
  courseName?: string;
  postedByName?: string;
}

export enum NoticeType {
  GENERAL = 'GENERAL',
  EXAM = 'EXAM',
  EVENT = 'EVENT',
  HOLIDAY = 'HOLIDAY',
  URGENT = 'URGENT',
  ACADEMIC = 'ACADEMIC'
}