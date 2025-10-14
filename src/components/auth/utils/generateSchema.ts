import { z } from "zod";
import type { FormField, ValidationRule } from "components/auth/utils/types";

export const generateSchema = (fields: FormField[]) => {
  const shape: Record<string, z.ZodString> = {};

  fields.forEach((field) => {
    let schema: z.ZodString = z.string();

    if (field.required) {
      schema = schema.nonempty(`${field.placeholder || field.name} is required`);
    }

    field.validations?.forEach((rule: ValidationRule) => {
      switch (rule.type) {
        case "email":
          schema = schema.email(rule.message || "Invalid email address");
          break;
        case "minLength":
          schema = schema.min(
            Number(rule.value),
            rule.message || `Minimum ${rule.value} characters required`
          );
          break;
        case "maxLength":
          schema = schema.max(
            Number(rule.value),
            rule.message || `Maximum ${rule.value} characters allowed`
          );
          break;
        case "match":
          break;
      }
    });

    shape[field.name] = schema;
  });

  let zodSchema = z.object(shape);

  fields.forEach((field) => {
    field.validations?.forEach((rule: ValidationRule) => {
      if (rule.type === "match" && typeof rule.value === "string") {
        zodSchema = zodSchema.refine(
          (data) => data[field.name] === data[rule.value as string],
          {
            message: rule.message || "Fields do not match",
            path: [field.name],
          }
        );
      }
    });
  });

  return zodSchema;
};
