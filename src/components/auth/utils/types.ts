export interface ValidationRule {
  type: "required" | "email" | "minLength" | "maxLength" | "match";
  value?: number | string;
  message?: string; 
}

export interface FormField {
  id: string;
  name: string;
  type?: "text" | "email" | "password" | "select" | "checkbox" | "radio" | "custom";
  placeholder?: string;
  required?: boolean;
  value?: string;
  options?: { label: string; value: string }[];
  component?: React.FC<any>; 
  onChange?: (e: React.ChangeEvent<any>) => void;
  validations?: ValidationRule[];
}

export interface AuthFormConfig {
  title: string;
  description: string;
  submitButtonLabel: string;
  redirectLink: { text: string; to: string };
  fields: FormField[];
}
