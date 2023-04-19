export interface LoginRequest {
  username: string;
  secret: string;
}

export interface AccountSlice {
  user: UserAccount | null
}

export interface UserAccount {
  username: string;
  avatar?: string;
  secret?: string;
  _id: string;
}
