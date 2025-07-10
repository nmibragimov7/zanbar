export type TRegister = {
  name: string;
  username: string;
  password: string;
  repeat_password?: string;
  otp?: string;
}
export type TVerify = {
  username: string;
  otp: string;
}
export type TLogin = {
  username: string;
  password: string;
}
export type TProfile = {
  firstname: string;
  lastname: string;
}
export type TPassword = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}