import React from "react";
import { useForm } from "react-hook-form";
import Input from "components/base-components/Input";
import Button from "components/base-components/Button";
import type { FormField } from "components/auth/FormTypes";
import { validateForm } from "utils/formValidation";

interface FormPanelProps {
  fields: FormField[];
  submitText: string;
  onSubmit: (formValues: Record<string, string>) => void;
}

const FormPanel: React.FC<FormPanelProps> = ({ fields, submitText, onSubmit, error }) => {
  const { register, handleSubmit } = useForm<Record<string, string>>({
    defaultValues: fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value || "" }), {}),
  });

  const onSubmitHandler = (data: Record<string, string>) => {
    onSubmit(data);
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
          />
        ))}
        <Button type="submit" text={submitText} />
      </form>
    </div>
  );
};

export default FormPanel;
