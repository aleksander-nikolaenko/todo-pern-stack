export interface User {
  id: string;
  email: string;
  password: string;
  isAuth: boolean;
  isVerified: boolean;
  verificationToken: string;
}

export interface UserRequest {
  email: string;
  id: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface ChangePassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}
