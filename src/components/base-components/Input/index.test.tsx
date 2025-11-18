import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../base-components/Input';

describe('Input', () => {
  describe('Rendering', () => {
    it('should render input field', () => {
      render(<Input placeholder="Enter text" />);
      
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<Input label="Email" id="email" placeholder="Enter email" />);
      
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('should render label as sr-only', () => {
      render(<Input label="Email" id="email" />);
      const label = screen.getByText('Email');
      
      expect(label).toHaveClass('sr-only');
    });

    it('should render without label when not provided', () => {
      render(<Input placeholder="No label" />);
      
      expect(screen.queryByRole('label')).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error message when error prop is provided', () => {
      render(<Input placeholder="Email" error="Email is required" />);
      
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    it('should apply error styles when error exists', () => {
      render(<Input placeholder="Email" error="Invalid email" />);
      const input = screen.getByPlaceholderText('Email');
      
      expect(input).toHaveClass('border-red-500');
    });

    it('should display error message in red', () => {
      render(<Input error="Error message" />);
      const errorMessage = screen.getByText('Error message');
      
      expect(errorMessage).toHaveClass('text-red-500');
    });

    it('should not display error message when error is not provided', () => {
      const { container } = render(<Input placeholder="No error" />);
      const errorElement = container.querySelector('.text-red-500');
      
      expect(errorElement).not.toBeInTheDocument();
    });
  });

  describe('Input Types', () => {
    it('should render text input by default', () => {
      render(<Input placeholder="Text" />);
      const input = screen.getByPlaceholderText('Text');
      
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should render email input', () => {
      render(<Input type="email" placeholder="Email" />);
      const input = screen.getByPlaceholderText('Email');
      
      expect(input).toHaveAttribute('type', 'email');
    });

    it('should render password input', () => {
      render(<Input type="password" placeholder="Password" />);
      const input = screen.getByPlaceholderText('Password');
      
      expect(input).toHaveAttribute('type', 'password');
    });

    it('should render number input', () => {
      render(<Input type="number" placeholder="Age" />);
      const input = screen.getByPlaceholderText('Age');
      
      expect(input).toHaveAttribute('type', 'number');
    });
  });

  describe('Interactions', () => {
    it('should call onChange when input value changes', () => {
      const handleChange = vi.fn();
      render(<Input placeholder="Type here" onChange={handleChange} />);
      
      const input = screen.getByPlaceholderText('Type here');
      fireEvent.change(input, { target: { value: 'Hello' } });
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should update input value', () => {
      render(<Input placeholder="Type here" />);
      
      const input = screen.getByPlaceholderText('Type here') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'New value' } });
      
      expect(input.value).toBe('New value');
    });

    it('should handle onFocus event', () => {
      const handleFocus = vi.fn();
      render(<Input placeholder="Focus me" onFocus={handleFocus} />);
      
      fireEvent.focus(screen.getByPlaceholderText('Focus me'));
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('should handle onBlur event', () => {
      const handleBlur = vi.fn();
      render(<Input placeholder="Blur me" onBlur={handleBlur} />);
      
      const input = screen.getByPlaceholderText('Blur me');
      fireEvent.blur(input);
      
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Attributes', () => {
    it('should apply custom className', () => {
      render(<Input placeholder="Custom" className="custom-input" />);
      const input = screen.getByPlaceholderText('Custom');
      
      expect(input).toHaveClass('custom-input');
    });

    it('should be disabled when disabled prop is true', () => {
      render(<Input placeholder="Disabled" disabled />);
      
      expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
    });

    it('should be required when required prop is true', () => {
      render(<Input placeholder="Required" required />);
      
      expect(screen.getByPlaceholderText('Required')).toBeRequired();
    });

    it('should apply id attribute', () => {
      render(<Input id="test-input" placeholder="Test" />);
      
      expect(screen.getByPlaceholderText('Test')).toHaveAttribute('id', 'test-input');
    });

    it('should apply name attribute', () => {
      render(<Input name="email" placeholder="Email" />);
      
      expect(screen.getByPlaceholderText('Email')).toHaveAttribute('name', 'email');
    });

    it('should apply maxLength attribute', () => {
      render(<Input placeholder="Limited" maxLength={10} />);
      
      expect(screen.getByPlaceholderText('Limited')).toHaveAttribute('maxLength', '10');
    });
  });

  describe('Default Styles', () => {
    it('should apply default styling classes', () => {
      render(<Input placeholder="Styled" />);
      const input = screen.getByPlaceholderText('Styled');
      
      expect(input).toHaveClass('w-full');
      expect(input).toHaveClass('p-2');
      expect(input).toHaveClass('rounded-lg');
      expect(input).toHaveClass('border');
    });

    it('should apply focus styles', () => {
      render(<Input placeholder="Focus" />);
      const input = screen.getByPlaceholderText('Focus');
      
      expect(input).toHaveClass('focus:outline-none');
      expect(input).toHaveClass('focus:ring-2');
      expect(input).toHaveClass('focus:ring-teal-400');
    });
  });

  describe('Ref Forwarding', () => {
    it('should forward ref to input element', () => {
      const ref = vi.fn();
      render(<Input ref={ref} placeholder="Ref test" />);
      
      expect(ref).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible label association', () => {
      render(<Input label="Username" id="username" />);
      const label = screen.getByText('Username');
      
      expect(label).toHaveAttribute('for', 'username');
    });

    it('should be keyboard navigable', () => {
      render(<Input placeholder="Navigate" />);
      const input = screen.getByPlaceholderText('Navigate');
      
      input.focus();
      expect(input).toHaveFocus();
    });
  });
});
