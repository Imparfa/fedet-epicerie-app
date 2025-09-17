export interface Card {
  id: string;
  studentId: string;
  frontPath: string;
  backPath?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  validityDate: Date;
  uploadedAt: Date;
  validatedBy: string;
}
