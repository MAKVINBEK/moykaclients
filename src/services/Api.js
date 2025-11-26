import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://1touch.navisdevs.ru/api";

const TOKEN_KEYS = {
  ACCESS: "access",   
  REFRESH: "refresh",
};

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

const saveTokens = async (access, refresh) => {
  if (access != null) await AsyncStorage.setItem(TOKEN_KEYS.ACCESS, access);
  if (refresh != null) await AsyncStorage.setItem(TOKEN_KEYS.REFRESH, refresh);
};

const clearTokens = async () => {
  await AsyncStorage.multiRemove([TOKEN_KEYS.ACCESS, TOKEN_KEYS.REFRESH]);
};

const getTokens = async () => {
  const [access, refresh] = await Promise.all([
    AsyncStorage.getItem(TOKEN_KEYS.ACCESS),
    AsyncStorage.getItem(TOKEN_KEYS.REFRESH),
  ]);
  return { access, refresh };
};

api.interceptors.request.use(async (config) => {
  try {
    const { access } = await getTokens();
    if (access) config.headers.Authorization = `Bearer ${access}`;
  } catch (e) {
  }
  return config;
});

let isRefreshing = false;
let queue = [];

const processQueue = (err, token = null) => {
  queue.forEach((p) => {
    if (err) p.reject(err);
    else p.resolve(token);
  });
  queue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (!original) return Promise.reject(err);

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      const { refresh } = await getTokens();
      if (!refresh) {
        await clearTokens();
        return Promise.reject(err);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: (newToken) => {
              original.headers.Authorization = `Bearer ${newToken}`;
              resolve(api(original));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const resp = await axios.post(`${BASE_URL}/token/refresh/`, {
          refresh,
          refreshToken: refresh,
        });

        const data = resp.data || {};

        const newAccess =
          data.access ||
          data.accessToken ||
          data.token ||
          data.access_token ||
          null;
        const newRefresh =
          data.refresh || data.refreshToken || data.refresh_token || null;

        if (!newAccess) {
          await clearTokens();
          processQueue(new Error("No new access token"), null);
          isRefreshing = false;
          return Promise.reject(err);
        }

        await saveTokens(newAccess, newRefresh ?? refresh);

        api.defaults.headers.Authorization = `Bearer ${newAccess}`;
        original.headers.Authorization = `Bearer ${newAccess}`;

        processQueue(null, newAccess);
        isRefreshing = false;

        return api(original);
      } catch (refreshErr) {
        isRefreshing = false;
        processQueue(refreshErr, null);
        await clearTokens();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
export { saveTokens, clearTokens, TOKEN_KEYS };
