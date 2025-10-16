import { describe, it, expect } from 'vitest';
import {
  findUserByEmail,
  validateCredentials,
  userExists,
} from '../../../auth/helpers/authValidators';
import type { User } from '../../../auth/authSlice';

describe('authValidators', () => {
  const users: User[] = [
    { fullName: 'John Doe', email: 'john@example.com', password: 'password123' },
    { fullName: 'Jane Smith', email: 'jane@example.com', password: 'secret456' },
  ];

  describe('findUserByEmail', () => {
    it('should find user by email', () => {
      const user = findUserByEmail(users, 'john@example.com');
      expect(user).toBeDefined();
      expect(user?.fullName).toBe('John Doe');
    });

    it('should return undefined for non-existent email', () => {
      const user = findUserByEmail(users, 'nonexistent@example.com');
      expect(user).toBeUndefined();
    });

    it('should be case sensitive', () => {
      const user = findUserByEmail(users, 'JOHN@EXAMPLE.COM');
      expect(user).toBeUndefined();
    });
  });

  describe('validateCredentials', () => {
    it('should return true for correct password', () => {
      const user = users[0];
      expect(validateCredentials(user, 'password123')).toBe(true);
    });

    it('should return false for incorrect password', () => {
      const user = users[0];
      expect(validateCredentials(user, 'wrongpassword')).toBe(false);
    });
  });

  describe('userExists', () => {
    it('should return true if user exists', () => {
      expect(userExists(users, 'john@example.com')).toBe(true);
    });

    it('should return false if user does not exist', () => {
      expect(userExists(users, 'nonexistent@example.com')).toBe(false);
    });

    it('should handle empty users array', () => {
      expect(userExists([], 'any@example.com')).toBe(false);
    });
  });
});
