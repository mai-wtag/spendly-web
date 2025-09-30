export interface ValidationRule {
  type: "required" | "email" | "minLength" | "maxLength" | "match";
  value?: number | string;
  message?: string; 
}

export interface FormField {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  value?: string;
  required?: boolean;
  validations?: ValidationRule[];
}
