export interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  repeatPassword?: string;
  enabled?: boolean;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserLogin {
  authorities:any;
  exp:number;
  iat:number;
  sub:string;
  username:string;
}
