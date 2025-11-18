export interface FormField<T = HTMLInputElement | HTMLSelectElement> {
  id: string;
  name: string;
  type?: "text" | "email" | "password" | "select" | "checkbox" | "radio" | "custom";
  placeholder?: string;
  required?: boolean;
  value?: string;
  options?: { label: string; value: string }[];
  component?: React.ComponentType<FormFieldProps>;
  onChange?: (e: React.ChangeEvent<T>) => void;
}

export interface FormFieldProps {
  field: FormField;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export interface AuthFormConfig {
  title: string;
  description: string;
  submitButtonLabel: string;
  redirectLink: { text: string; to: string };
  fields: FormField[];
}
