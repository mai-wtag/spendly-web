import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthFormBuilder, { generateDefaultValues } from '../../auth/AuthFormBuilder';
import type { FormField } from 'utils/formTypes';

describe('generateDefaultValues', () => {
  it('should generate default values from fields', () => {
    const fields = [
      { name: 'email', value: 'test@example.com' },
      { name: 'password', value: '' },
      { name: 'name' },
    ];

    const result = generateDefaultValues(fields);

    expect(result).toEqual({
      email: 'test@example.com',
      password: '',
      name: '',
    });
  });

  it('should handle empty fields array', () => {
    const result = generateDefaultValues([]);
    expect(result).toEqual({});
  });
});

describe('AuthFormBuilder', () => {
  const mockOnSubmit = vi.fn();

  const fields: FormField[] = [
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Enter email',
      validations: [
        { type: 'required' },
        { type: 'email', message: 'Invalid email' },
      ],
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Enter password',
      validations: [
        { type: 'required' },
        { type: 'minLength', value: 6 },
      ],
    },
  ];

  it('should render form with fields', () => {
    render(
      <AuthFormBuilder
        fields={fields}
        submitButtonLabel="Submit"
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should call onSubmit with form values on valid submission', async () => {
    render(
      <AuthFormBuilder
        fields={fields}
        submitButtonLabel="Submit"
        onSubmit={mockOnSubmit}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('should show validation errors for invalid input', async () => {
    render(
      <AuthFormBuilder
        fields={fields}
        submitButtonLabel="Submit"
        onSubmit={mockOnSubmit}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument();
    });
  });
});
