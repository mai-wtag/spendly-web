import React, { useState } from "react";
import Input from "components/base-components/Input";
import Button from "components/base-components/Button";
import type { FormField } from "components/auth/FormTypes";

interface FormPanelProps {
  fields: FormField[];
  submitText: string;
  onSubmit: (formValues: Record<string, string>) => void;
}

const FormPanel: React.FC<FormPanelProps> = ({ fields, submitText, onSubmit }) => {
  const [formValues, setFormValues] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value || "" }), {})
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = formValues[field.name]?.trim();

      if (field.required && !value) {
        newErrors[field.name] = `${field.placeholder} is required`;
      }

      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = "Invalid email format";
        }
      }

      if (field.name === "password" && value && value.length < 6) {
        newErrors[field.name] = "Password must be at least 6 characters";
      }

      if (field.name === "confirmPassword" && value !== formValues["password"]) {
        newErrors[field.name] = "Passwords do not match";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formValues);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <div key={field.id} className="space-y-1">
            <Input
              id={field.id}
              name={field.name}
              type={field.type || "text"}
              placeholder={field.placeholder}
              required={field.required}
              value={formValues[field.name]}
              onChange={handleChange}
            />
            {errors[field.name] && (
              <p className="text-sm text-red-500">{errors[field.name]}</p>
            )}
          </div>
        ))}
        <Button type="submit" text={submitText} />
      </form>
    </div>
  );
};

export default FormPanel;
