export interface LoginRequest {
  username: string;
  secret: string;
}

export interface AccountSlice {
  user: LoginRequest | null
}