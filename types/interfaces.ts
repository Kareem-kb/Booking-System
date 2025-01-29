// Branch files
export interface BranchTranslation {
  language: 'en' | 'ar';
  name: string;
  address: string;
}
export interface BranchFormData {
  nameEn: string;
  nameAr: string;
  addressEn: string;
  addressAr: string;
  contactEmail?: string;
  phoneNumber: string;
  website?: string;
}
export interface BranchBasicInfo {
  translations: BranchTranslation[];
  contactEmail?: string | null;
  phoneNumber: string;
  website?: string | null;
}
export interface OperatingHour {
  name: string;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

// Auth.ts
export interface Token {
  id: string;
  name: string;
  role: string;
  email: string;
}
export interface Session {
  user: {
    id: string;
    name: string;
    role: string;
    email: string;
  };
}
