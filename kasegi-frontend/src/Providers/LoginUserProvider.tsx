import React, { createContext, useState } from "react";
import { LoginUser } from "../ClassDefinition";

type LoginUserContextType = {
  LoginUser: LoginUser;
  setLoginUser: (status: LoginUser) => void;
  getLoginUser: () => LoginUser;
};

const defaultLoginUser = { email: "", sessoinToken: "" };
export const LoginUserContext = createContext<LoginUserContextType>({
  LoginUser: defaultLoginUser,
  setLoginUser: (loginUser: LoginUser) => {},
  getLoginUser: () => defaultLoginUser,
});

/**
 * プロバイダ (これ以下の要素で UserContext を使える)
 */
export const LoginUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ユーザ情報の初期値
  const [LoginUser, set] = useState<LoginUser>(defaultLoginUser);

  const getLoginUser = () => LoginUser;

  const setLoginUser = (entity: LoginUser) => set(entity);

  return (
    <LoginUserContext.Provider
      value={{ LoginUser, setLoginUser, getLoginUser }}
    >
      {children}
    </LoginUserContext.Provider>
  );
};
