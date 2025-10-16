import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../base-components/Input";
import Button from "../../base-components/Button";
import { generateSchema } from "../../../utils/generateSchema";
import type { FormField } from "utils/formTypes";

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
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: generateDefaultValues(fields) as FormData,
  });

  const onSubmitHandler: SubmitHandler<FormData> = (data) => {
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
