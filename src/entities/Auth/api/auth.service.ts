import {fetcher} from "@/shared/lib/axios";
import {TLogin, TPassword, TProfile, TRegister, TVerify} from "@/entities/Auth/Auth.module";

const api = {
  login: "/v1/auth/login",
  register: "/v1/auth/register",
  verify: "/v1/auth/verify",
  profile: "/v1/account",
  imageUpdate: "/v1/account/update-image",
  profileUpdate: "/v1/account/update-user-info",
  passwordUpdate: "/v1/account/change-password",
}

class CourseService {
  login(body: TLogin) {
    return fetcher.post(api.login, body)
  }
  register(body: TRegister) {
    return fetcher.post(api.register, body)
  }
  verify(body: TVerify) {
    return fetcher.post(api.verify, body)
  }
  profile() {
    return fetcher.get(api.profile)
  }
  imageUpdate(body: FormData) {
    return fetcher.post(api.imageUpdate, body)
  }
  profileUpdate(body: TProfile) {
    return fetcher.post(api.profileUpdate, body)
  }
  passwordUpdate(body: TPassword) {
    return fetcher.post(api.passwordUpdate, body)
  }
}

export default new CourseService();