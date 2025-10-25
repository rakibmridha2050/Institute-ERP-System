import { BaseEntity } from './base-entity.model';
import { Department } from './department.model';
import { Section } from './section.model';

export interface Classes extends BaseEntity {
  className: string;
  department: Department;
  sections: Section[];
}


export interface ClassesCreateDTO {
  className: string;
  departmentId: number;
}

export interface ClassesDTO extends BaseEntity {
  className: string;
  department: Department;
  sections: Section[];
}