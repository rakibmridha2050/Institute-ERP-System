export interface BaseEntity {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  active?: boolean;
  createdBy?: string;
  updatedBy?: string;
}