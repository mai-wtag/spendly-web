import React, { useState } from "react";
import Input from "components/base-components/Input";
import Button from "components/base-components/Button";
import type { FormField } from "components/auth/FormTypes"; 

interface FormPanelProps {
  fields: FormField[];
  submitText: string;
  onSubmit: (formValues: Record<string, string>) => void;
  error?: string;
}

const FormPanel: React.FC<FormPanelProps> = ({ fields, submitText, onSubmit, error }) => {
  const [formValues, setFormValues] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value || "" }), {})
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    const field = fields.find(f => f.name === e.target.name);
    if (field?.onChange) field.onChange(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <Input
            key={field.id}
            id={field.id}
            name={field.name}
            type={field.type || "text"}
            placeholder={field.placeholder}
            required={field.required}
            value={formValues[field.name]}
            onChange={handleChange}
          />
        ))}
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" text={submitText} />
      </form>
    </div>
  );
};

export default FormPanel;
