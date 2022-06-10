export type SignUpParams = {
  nickname: string;
  email: string;
  password: string;
};

export type SignInParams = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  uid: string;
  provider: string;
  email: string;
  nickname: string;
  created_at: Date;
  updated_at: Date;
};
