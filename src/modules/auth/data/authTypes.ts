export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  verify_password: string;
  phoneNumber?: string | null;
}

export interface resetPasswordPayload {
  email: string;
}
export interface enterNewPasswordPayload {
  newPassword: string | null;
  token: string | null;
}
