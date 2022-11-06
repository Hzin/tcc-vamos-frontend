import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
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

  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await localStorage.getItem("user");
      const storagedToken = await localStorage.getItem("tokenId");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setToken(storagedToken);
      }
    }

    loadStorageData();
  });

  async function signIn(login: string, password: string) {
    const singinForm = {
      login,
      password,
    };

    await sessionRoutes
      .create(singinForm)
      .then((response) => {
        if (response.status === "error") {
          setMessageToast(response.message);
          setShowToast(true);

          return;
        }

        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        setToken(response.token);
        localStorage.setItem("tokenId", response.token);

        // history.push({
        //   pathname: "/home",
        //   state: {
        //     redirectData: {
        //       showToastMessage: true,
        //       toastColor: "success",
        //       toastMessage: "Usuário autenticado com sucesso!",
        //     },
        //   },
        // });
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