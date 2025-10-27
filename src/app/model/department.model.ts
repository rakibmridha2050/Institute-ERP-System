export interface Department {
  deptId: number;
  deptName: string;
  deptCode: string;
  active?: boolean;
}

export interface DepartmentCreateRequest {
  deptName: string;
  deptCode: string;
}

export interface DepartmentUpdateRequest {
  deptName: string;
  deptCode: string;
}