export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthStorage {
  isAuthenticated: boolean;
  user: User | null;
}
