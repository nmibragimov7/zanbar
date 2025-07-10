import type {TRegister, TVerify, TLogin, TProfile, TPassword} from "./types";
import authService from "./api/auth.service";
import {useLogin} from "./hooks/useLogin";
import {useRegister} from "./hooks/useRegister";
import {useVerify} from "./hooks/useVerify";
import {useProfile} from "./hooks/useProfile";
import {useImageUpdate} from "./hooks/useImageUpdate";
import {useProfileUpdate} from "./hooks/useProfileUpdate";
import {usePasswordUpdate} from "./hooks/usePasswordUpdate";

export {
  TRegister,
  TVerify,
  TLogin,
  TProfile,
  TPassword,
  authService,
  useLogin,
  useRegister,
  useVerify,
  useProfile,
  useImageUpdate,
  useProfileUpdate,
  usePasswordUpdate,
}