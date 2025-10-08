import { useForm } from "react-hook-form";
import Input from "components/base-components/Input";
import Button from "components/base-components/Button";
import type { FormField } from "components/auth/utils/types";

export interface Field {
  name: string;
  value?: string;
}

export const generateDefaultValues = (fields: Field[]): Record<string, string> => {
  const defaultValues: Record<string, string> = {};

  fields.forEach(field => {
    defaultValues[field.name] = field.value || "";
  });

  return defaultValues;
};


interface AuthFormBuilderProps {
  fields: FormField[];
  submitButtonLabel: string;
  onSubmit: (formValues: Record<string, string>) => void;
  error?: string;
}

const AuthFormBuilder: React.FC<AuthFormBuilderProps> = ({ fields, submitButtonLabel, onSubmit, error }) => {
  const { register, handleSubmit } = useForm<Record<string, string>>({
    defaultValues: generateDefaultValues(fields),
  });

  const submitForm = (data: Record<string, string>) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="w-full max-w-md space-y-6">
      {fields.map((field) => (
        <Input
          key={field.id}
          id={field.id}
          type={field.type || "text"}
          placeholder={field.placeholder}
          {...register(field.name)}
        />
      ))}
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" text={submitButtonLabel} />
    </form>
  );
};

export default AuthFormBuilder;
