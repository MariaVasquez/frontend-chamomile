export interface User {
  username:string;
  password:string;
  firstName:string;
  lastName:string;
  phoneNumber:string;
  repeatPassword?:string;
  enabled?:boolean;
}
