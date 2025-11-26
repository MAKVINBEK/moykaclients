// AuthService.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { saveTokens, TOKEN_KEYS } from "./Api";

// Примеры auth-функций — минимально, без лишнего
export const sendCode = (email) =>
  api.post("/user/auth/resend-register/", { email }).then((r) => r.data);

export const verifyCode = (email, code) =>
  api.post("/user/auth/verify-otp/", { email, code }).then((r) => r.data);

// loginUser: сохраняем токены (если пришли) и возвращаем payload сервера
export const loginUser = async (email, password) => {
  const res = await api.post("/user/auth/login/", { email, password });
  const data = res.data || {};

  // допускаем разные формы ключей
  const access =
    data.access || data.accessToken || data.token || data.access_token || null;
  const refresh =
    data.refresh || data.refreshToken || data.refresh_token || null;

  if (access) {
    await saveTokens(access, refresh ?? undefined);
  }

  return data;
};

export const forgotPassword = (email) =>
  api.post("/user/auth/reset-password/", { email }).then((r) => r.data);

export const forgotCode = (email, code) =>
  api
    .post("/user/auth/confirm-reset-password/", { email, code })
    .then((r) => r.data);

export const supportMessage = (payload = {}) =>
  api.post("/main/support/messages/", payload).then((r) => r.data);

export const updatePerson = async (payload) => 
    api.post("/user/update-profile/", payload).then((r) => r.data);


export const newPassword = (reset_token, password, confirm_password) =>
  api
    .post(
      "/user/auth/new-password/",
      { password, confirm_password },
      {
        headers: {
          Authorization: `Bearer ${reset_token}`,
        },
      }
    )
    .then((r) => r.data);





export const getPerson = () =>
  api.get("/user/user-profile/").then((res) => res.data);

export const getProfile = () =>
  api.get("/main/mycar-profile/").then((res) => res.data);

export const patchMyCarProfile = (payload) =>
  api.put("/main/mycar-profile/", payload).then((r) => r.data);

export const getMarkas = (params = {}) =>
  api.get("/main/category/marka/", { params }).then((r) => r.data);

export const getModels = (params = {}) =>
  api.get("/main/category/model/", { params }).then((r) => r.data);

export const getBodies = (params = {}) =>
  api.get("/main/category/body/", { params }).then((r) => r.data);

export const getHistory = (params = {}) =>
  api.get("/payment/history/", { params }).then((r) => r.data);

export const getFaq = (params = {}) =>
  api.get("/main/faqs/", { params }).then((r) => r.data);

export const getList = (params = {}) =>
  api.get("/payment/car-wash/", { params }).then((r) => r.data);





export const logoutUser = async () => {
  await AsyncStorage.removeItem("access");
};

export const deleteAccount = async () => {
  return api.delete("/user/delete-account/").then(r => r.data);
};
