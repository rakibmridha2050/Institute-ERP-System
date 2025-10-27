export interface FacultyDetails {
  id?: number;
  facultyId: number;
  facultyName?: string;
  facultyEmail?: string;
  employeeId: string;
  dateOfBirth?: string;
  gender?: string;
  bloodGroup?: string;
  nationalId?: string;
  passportNumber?: string;
  
  // Address
  streetAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  
  // Emergency contact
  emergencyContact?: string;
  emergencyContactRelationship?: string;
  emergencyContactPhone?: string;
  
  // Bank details
  bankAccountNumber?: string;
  bankName?: string;
  bankBranch?: string;
  
  // Professional details
  joiningDate: string;
  qualification?: string;
  specialization?: string;
  experienceYears?: number;
  salaryScale?: string;
  currentSalary?: number;
  
  // Personal details
  maritalStatus?: string;
  spouseName?: string;
  
  // Documents
  profilePictureUrl?: string;
  cvDocumentUrl?: string;
  otherDocumentsUrls?: string;
  
  // Additional information
  bio?: string;
  researchInterests?: string;
  publications?: string;
  awardsAchievements?: string;
  
  // Audit fields
  createdAt?: string;
  updatedAt?: string;
  active?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

export interface FacultyDetailsRequest {
  facultyId: number;
  employeeId: string;
  dateOfBirth?: string;
  gender?: string;
  bloodGroup?: string;
  nationalId?: string;
  passportNumber?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  emergencyContact?: string;
  emergencyContactRelationship?: string;
  emergencyContactPhone?: string;
  bankAccountNumber?: string;
  bankName?: string;
  bankBranch?: string;
  joiningDate: string;
  qualification?: string;
  specialization?: string;
  experienceYears?: number;
  salaryScale?: string;
  currentSalary?: number;
  maritalStatus?: string;
  spouseName?: string;
  profilePictureUrl?: string;
  cvDocumentUrl?: string;
  otherDocumentsUrls?: string;
  bio?: string;
  researchInterests?: string;
  publications?: string;
  awardsAchievements?: string;
}