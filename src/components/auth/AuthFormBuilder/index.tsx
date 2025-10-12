import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "components/base-components/Input";
import Button from "components/base-components/Button";
import { generateSchema } from "utils/generateSchema";
import type { FormField } from "utils/types";

export interface Field {
  name: string;
  value?: string;
}

export const generateDefaultValues = (
  fields: Field[]
): Record<string, string> => {
  const defaultValues: Record<string, string> = {};

  fields.forEach((field) => {
    defaultValues[field.name] = field.value || "";
  });

  return defaultValues;
};

interface AuthFormBuilderProps {
  fields: FormField[];
  submitButtonLabel: string;
  onSubmit: (formValues: Record<string, string>) => void;
}

const AuthFormBuilder: React.FC<AuthFormBuilderProps> = ({
  fields,
  submitButtonLabel,
  onSubmit,
}) => {
  const schema = generateSchema(fields);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),
    defaultValues: generateDefaultValues(fields),
  });

  const onSubmitHandler: SubmitHandler<Record<string, unknown>> = (data) => {
    const stringData: Record<string, string> = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, String(value)])
    );
    onSubmit(stringData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="space-y-6"
    >
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

      <Button type="submit" text={submitButtonLabel} fullWidth/>
    </form>
  );
};

export default AuthFormBuilder;