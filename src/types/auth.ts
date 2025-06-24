export interface AuthFormData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    email: string;
    role: 'admin' | 'user';
  };
}