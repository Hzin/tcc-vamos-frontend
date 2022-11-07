import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { User } from "../models/user.model";
import * as sessionRoutes from "../services/api/session";

interface AuthContextData {
  signed: boolean;
  token: string | null;
  user: User | null;
  signIn(login: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as  AuthContextData);

const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function signIn(login: string, password: string) {
    const singinForm = {
      login,
      password,
    };

    await sessionRoutes
      .create(singinForm)
      .then((response) => {
        if (response.status === "error") {
          return;
        }

        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        setToken(response.token);
        localStorage.setItem("tokenId", response.token);
      })
      .catch((error) => {
        console.log("Houve um erro: ", { error });
      });
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, token, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
};

export {AuthProvider, useAuth};