import {createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";

import {accessTokenStorage, refreshTokenStorage, userStorage} from "@/shared/lib/lsStorage";

interface IContext {
  isAuth: boolean;
  user: any;
  setUser?: (data: any) => void;
  onLogout?: () => void;
}

const initial = {
  isAuth: false,
  user: null,
};
const Context = createContext<IContext>(initial);
const {Provider} = Context;
export const useAuth = () => useContext(Context);

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [state, setState] = useState({
    isAuth: false,
    user: null,
  });

  const setUser = (data: any) => {
    userStorage.save(data);
    setState((prev) => {
      return {
        ...prev,
        isAuth: true,
        user: data,
      };
    });
  };
  const onLogout = () => {
    accessTokenStorage.clear();
    refreshTokenStorage.clear();
    userStorage.clear();
    setState(initial);
  };

  const value = useMemo(() => {
    return {
      onLogout,
      setUser,
      ...state,
    };
  }, [state]);

  useEffect(() => {
    setIsClient(true);
    if (accessTokenStorage.get() && userStorage.get()) {
      setState({
        isAuth: true,
        user: userStorage.get(),
      });
    }
  }, [router]);

  if (!isClient) {
    return (
      <>
        {children}
      </>
    );
  }
  return <Provider value={value}>{children}</Provider>;
};
