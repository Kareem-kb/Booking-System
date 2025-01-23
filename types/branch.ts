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
