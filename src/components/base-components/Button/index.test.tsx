import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../base-components/Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('should render button with text', () => {
      render(<Button text="Click Me" />);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should render button with icon on left', () => {
      const icon = <span data-testid="test-icon">Icon</span>;
      render(<Button text="Click Me" icon={icon} iconPosition="left" />);
      
      const button = screen.getByRole('button');
      const iconElement = screen.getByTestId('test-icon');
      
      expect(button).toContainElement(iconElement);
      expect(iconElement.parentElement?.nextElementSibling?.textContent).toBe('Click Me');
    });

    it('should render button with icon on right', () => {
      const icon = <span data-testid="test-icon">Icon</span>;
      render(<Button text="Click Me" icon={icon} iconPosition="right" />);
      
      const button = screen.getByRole('button');
      const iconElement = screen.getByTestId('test-icon');
      
      expect(button).toContainElement(iconElement);
    });
  });

  describe('Variants', () => {
    it('should apply primary variant styles by default', () => {
      render(<Button text="Primary" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('bg-teal-400');
      expect(button).toHaveClass('text-white');
    });

    it('should apply secondary variant styles', () => {
      render(<Button text="Secondary" variant="secondary" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('bg-gray-200');
      expect(button).toHaveClass('text-gray-800');
    });

    it('should apply danger variant styles', () => {
      render(<Button text="Danger" variant="danger" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('bg-red-500');
      expect(button).toHaveClass('text-white');
    });

    it('should apply success variant styles', () => {
      render(<Button text="Success" variant="success" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('bg-green-500');
      expect(button).toHaveClass('text-white');
    });

    it('should apply outline variant styles', () => {
      render(<Button text="Outline" variant="outline" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('border');
      expect(button).toHaveClass('border-gray-300');
    });
  });

  describe('Sizes', () => {
    it('should apply medium size by default', () => {
      render(<Button text="Medium" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('px-4');
      expect(button).toHaveClass('py-2');
      expect(button).toHaveClass('text-base');
    });

    it('should apply small size styles', () => {
      render(<Button text="Small" size="sm" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('px-3');
      expect(button).toHaveClass('py-1');
      expect(button).toHaveClass('text-sm');
    });

    it('should apply large size styles', () => {
      render(<Button text="Large" size="lg" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('px-6');
      expect(button).toHaveClass('py-3');
      expect(button).toHaveClass('text-lg');
    });
  });

  describe('Full Width', () => {
    it('should apply full width when fullWidth is true', () => {
      render(<Button text="Full Width" fullWidth />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('w-full');
    });

    it('should not apply full width by default', () => {
      render(<Button text="Normal Width" />);
      const button = screen.getByRole('button');
      
      expect(button).not.toHaveClass('w-full');
    });
  });

  describe('Interactions', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button text="Click Me" onClick={handleClick} />);
      
      fireEvent.click(screen.getByRole('button'));
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(<Button text="Disabled" onClick={handleClick} disabled />);
      
      fireEvent.click(screen.getByRole('button'));
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should be disabled when disabled prop is true', () => {
      render(<Button text="Disabled" disabled />);
      
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Custom Props', () => {
    it('should apply custom className', () => {
      render(<Button text="Custom" className="custom-class" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('custom-class');
    });

    it('should handle type attribute', () => {
      render(<Button text="Submit" type="submit" />);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should apply aria-label', () => {
      render(<Button text="Button" aria-label="Custom Label" />);
      
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom Label');
    });
  });
});
