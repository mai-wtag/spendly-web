import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "components/base-components/Input";
import Button from "components/base-components/Button";
import type { FormField, ValidationRule } from "components/auth/FormTypes";

interface FormPanelProps {
  fields: FormField[];
  submitText: string;
  onSubmit: (formValues: Record<string, string>) => void;
}

const generateSchema = (fields: FormField[]) => {
  const shape: Record<string, z.ZodType<string, any>> = {};

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
          schema = schema.min(Number(rule.value), rule.message || `Minimum ${rule.value} characters required`);
          break;
        case "maxLength":
          schema = schema.max(Number(rule.value), rule.message || `Maximum ${rule.value} characters allowed`);
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
          { message: rule.message || "Fields do not match", path: [field.name] }
        );
      }
    });
  });

  return zodSchema;
};

const FormPanel: React.FC<FormPanelProps> = ({ fields, submitText, onSubmit }) => {
  const schema = generateSchema(fields);

  const { register, handleSubmit, formState: { errors } } = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value || "" }), {}),
  });

  const onSubmitHandler: SubmitHandler<Record<string, unknown>> = (data) => {

    const stringData: Record<string, string> = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [k, String(v)])
    );
    onSubmit(stringData);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
        {fields.map((field) => (
          <Input
            key={field.id}
            id={field.id}
            type={field.type || "text"}
            placeholder={field.placeholder}
            {...register(field.name)}
            error={errors[field.name]?.message as string}
          />
        ))}
        <Button type="submit" text={submitText} fullWidth />
      </form>
    </div>
  );
};

export default FormPanel;
