import { describe, it, expect } from 'vitest';
import type { FormField } from 'utils/formTypes';
import { generateSchema } from '../generateSchema';

describe('generateSchema', () => {
  it('should generate schema for required fields', () => {
    const fields: FormField[] = [
      {
        id: 'email',
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        required: true,
        validations: [{ type: 'email', message: 'Invalid email' }],
      },
    ];

    const schema = generateSchema(fields);
    const result = schema.safeParse({ email: '' });

    expect(result.success).toBe(false);
  });

  it('should validate email format', () => {
    const fields: FormField[] = [
      {
        id: 'email',
        name: 'email',
        type: 'email',
        required: true,
        validations: [{ type: 'email' }],
      },
    ];

    const schema = generateSchema(fields);
    
    expect(schema.safeParse({ email: 'invalid' }).success).toBe(false);
    expect(schema.safeParse({ email: 'valid@example.com' }).success).toBe(true);
  });

  it('should validate minLength', () => {
    const fields: FormField[] = [
      {
        id: 'password',
        name: 'password',
        type: 'password',
        required: true,
        validations: [{ type: 'minLength', value: 8 }],
      },
    ];

    const schema = generateSchema(fields);

    expect(schema.safeParse({ password: 'short' }).success).toBe(false);
    expect(schema.safeParse({ password: 'longenough' }).success).toBe(true);
  });

  it('should validate maxLength', () => {
    const fields: FormField[] = [
      {
        id: 'name',
        name: 'name',
        type: 'text',
        required: true,
        validations: [{ type: 'maxLength', value: 10 }],
      },
    ];

    const schema = generateSchema(fields);

    expect(schema.safeParse({ name: 'verylongname' }).success).toBe(false);
    expect(schema.safeParse({ name: 'short' }).success).toBe(true);
  });

  it('should validate match fields', () => {
    const fields: FormField[] = [
      {
        id: 'password',
        name: 'password',
        type: 'password',
        required: true,
      },
      {
        id: 'confirmPassword',
        name: 'confirmPassword',
        type: 'password',
        required: true,
        validations: [
          {
            type: 'match',
            value: 'password',
            message: 'Passwords do not match',
          },
        ],
      },
    ];

    const schema = generateSchema(fields);

    expect(
      schema.safeParse({
        password: 'password123',
        confirmPassword: 'different',
      }).success
    ).toBe(false);

    expect(
      schema.safeParse({
        password: 'password123',
        confirmPassword: 'password123',
      }).success
    ).toBe(true);
  });
});
