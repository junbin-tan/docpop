export interface ClientDetails {
  name: string;
  email: string;
  phoneNumber: string;
  identificationNumber: string;
}

export interface DocumentGenerationResult {
  success: boolean;
  message: string;
  documentsGenerated?: string[];
}