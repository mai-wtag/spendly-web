import { describe, it, expect, beforeEach } from 'vitest';
import {
  getUsersFromLocalStorage,
  saveUsersToLocalStorage,
  getUserFromLocalStorage,
  saveUserToAuth,
} from '../../../auth/helpers/authStorage';
import type { User } from '../../../auth/authSlice';

describe('authStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getUsersFromLocalStorage', () => {
    it('should return empty array when no users exist', () => {
      const users = getUsersFromLocalStorage();
      expect(users).toEqual([]);
    });

    it('should return users array from localStorage', () => {
      const mockUsers: User[] = [
        { fullName: 'Test User', email: 'test@example.com', password: 'password' },
      ];
      localStorage.setItem('users', JSON.stringify(mockUsers));

      const users = getUsersFromLocalStorage();
      expect(users).toEqual(mockUsers);
    });
  });

  describe('saveUsersToLocalStorage', () => {
    it('should save users to localStorage', () => {
      const users: User[] = [
        { fullName: 'Test User', email: 'test@example.com', password: 'password' },
      ];

      saveUsersToLocalStorage(users);

      const stored = localStorage.getItem('users');
      expect(stored).toBeDefined();
      expect(JSON.parse(stored!)).toEqual(users);
    });
  });

  describe('getUserFromLocalStorage', () => {
    it('should return null when no auth data exists', () => {
      const user = getUserFromLocalStorage();
      expect(user).toBeNull();
    });

    it('should return null when loggedOut flag is true', () => {
      localStorage.setItem('loggedOut', 'true');
      localStorage.setItem(
        'auth',
        JSON.stringify({
          isAuthenticated: true,
          user: { email: 'test@example.com', password: 'password' },
        })
      );

      const user = getUserFromLocalStorage();
      expect(user).toBeNull();
    });

    it('should return user when authenticated', () => {
      const mockUser = { email: 'test@example.com', password: 'password' };
      localStorage.setItem(
        'auth',
        JSON.stringify({ isAuthenticated: true, user: mockUser })
      );

      const user = getUserFromLocalStorage();
      expect(user).toEqual(mockUser);
    });

    it('should return null when not authenticated', () => {
      localStorage.setItem(
        'auth',
        JSON.stringify({ isAuthenticated: false, user: null })
      );

      const user = getUserFromLocalStorage();
      expect(user).toBeNull();
    });
  });

  describe('saveUserToAuth', () => {
    it('should save user to auth in localStorage', () => {
      const user: User = {
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };

      saveUserToAuth(user);

      const stored = localStorage.getItem('auth');
      expect(stored).toBeDefined();
      const parsed = JSON.parse(stored!);
      expect(parsed.isAuthenticated).toBe(true);
      expect(parsed.user).toEqual(user);
    });
  });
});
