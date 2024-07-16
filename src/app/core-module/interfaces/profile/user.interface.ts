export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nickName: string;
  password: string;
  universityName: string;
  major: number;
  intake: number;
  year: number;
  rowStatus: number;
  sharePhoneNumber: boolean;
  shareOnlyNickName: boolean;
  jwt: string;
  phoneNumberAlreadyExists: boolean;
  emailAlreadyExists: boolean;
  roles: string[];
}
