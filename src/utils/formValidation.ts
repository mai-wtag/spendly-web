import validator from "validator";
import type { FormField, ValidationRule } from "components/auth/FormTypes";

interface ValidationResult {
  [key: string]: string;
}

const validationHandlers: Record<string, (value: string, rule: ValidationRule, formValues: Record<string, string>) => string | null> = {
  required: (value, rule) => {
    if (validator.isEmpty(value)) return rule.message || "This field is required";
    return null;
  },
  email: (value, rule) => {
    if (!validator.isEmail(value)) return rule.message || "Invalid email format";
    return null;
  },
  minLength: (value, rule) => {
    if (!rule.value || typeof rule.value !== "number") return null;
    if (!validator.isLength(value, { min: rule.value })) return rule.message || `Minimum ${rule.value} characters required`;
    return null;
  },
  maxLength: (value, rule) => {
    if (!rule.value || typeof rule.value !== "number") return null;
    if (!validator.isLength(value, { max: rule.value })) return rule.message || `Maximum ${rule.value} characters allowed`;
    return null;
  },
  match: (value, rule, formValues) => {
    if (!rule.value || typeof rule.value !== "string") return null;
    if (value !== formValues[rule.value]) return rule.message || "Fields do not match";
    return null;
  },
};

export const validateForm = (fields: FormField[], formValues: Record<string, string>): ValidationResult => {
  const errors: ValidationResult = {};

  fields.forEach((field) => {
    const value = formValues[field.name]?.trim() || "";

    if (field.validations && field.validations.length > 0) {
      for (const rule of field.validations) {
        const error = validationHandlers[rule.type]?.(value, rule, formValues);
        if (error) {
          errors[field.name] = error;
          break;
        }
      }
    }
  });

  return errors;
};
