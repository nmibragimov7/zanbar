const storage = <T = string>(key: string) => ({
  _value: null as T | null,
  save(data: T) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
    }
  },
  get() {
    if (typeof localStorage !== "undefined") {
      const data: any = localStorage.getItem(key) !== "undefined" ? localStorage.getItem(key) : "null";
      this._value = JSON.parse(data);
      return this._value;
    }
    return null;
  },
  clear() {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
    }
  },
});

export const accessTokenStorage = storage('access');
export const refreshTokenStorage = storage('refresh');
export const userStorage = storage<any>('user');
export default storage;
