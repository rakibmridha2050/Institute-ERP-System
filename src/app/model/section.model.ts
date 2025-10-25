export interface Section {
  id: number;
  sectionName: string;
}

// src/app/models/section.model.ts
import { BaseEntity } from './base-entity.model';

export interface Section extends BaseEntity {
  sectionName: string;
  classes?: ClassInfo;
  students?: any[]; // You can define Student interface later
}

export interface SectionDTO {
  id: number;
  sectionName: string;
  classInfo?: ClassInfo;
  active?: boolean;
  
}

export interface SectionCreateDTO {
  sectionName: string;
  classId: number;
}

export interface ClassInfo {
  id: number;
  className: string;
  departmentName: string;
  departmentCode?: string;
}