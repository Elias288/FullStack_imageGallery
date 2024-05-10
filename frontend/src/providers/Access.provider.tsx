import React, { createContext, useEffect, useReducer } from "react";
import { loginService } from "../services/user.service";

interface CustomContextProps {
  accessState: State;
  accessDispatch: React.Dispatch<StateAction>;
  login: (username: string, password: string) => void;
}
export const CustomContext = createContext<CustomContextProps | undefined>(
  undefined
);

interface State {
  isLogged: boolean;
  accessToken: string;
  message: string;
  isLoading: boolean;
}
const initialState: State = {
  isLogged: false,
  accessToken: "",
  message: "",
  isLoading: true,
};

type StateAction =
  | { type: "loading"; value: State["isLoading"] }
  | { type: "signIn"; value: State["accessToken"] }
  | { type: "alreadySignIn"; value: State["accessToken"] }
  | { type: "errorLogged"; value: State["message"] }
  | { type: "signOut" };
function stateReducer(state: State, action: StateAction): State {
  switch (action.type) {
    case "loading": {
      return { ...state, isLoading: action.value };
    }
    case "signIn": {
      localStorage.setItem("accessToken", action.value); // guarda en local storage el token
      return {
        isLoading: false,
        message: "",
        isLogged: true,
        accessToken: action.value,
      };
    }
    case "alreadySignIn": {
      return { ...state, isLogged: true, accessToken: action.value };
    }
    case "signOut": {
      localStorage.removeItem("accessToken"); // elimina el token del local storage
      return { ...state, accessToken: "", isLogged: false };
    }
    case "errorLogged": {
      return {
        isLoading: false,
        isLogged: false,
        accessToken: "",
        message: action.value,
      };
    }
    default:
      throw new Error("Unknown action");
  }
}

interface AccessProviderProps {
  children: React.ReactNode;
}
const AccessProvider = ({ children }: AccessProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "loading", value: false }); // finaliza el loading
      const storedToken = localStorage.getItem("accessToken"); // busca el token en el local storage
      if (storedToken) dispatch({ type: "alreadySignIn", value: storedToken }); // si existe
    }, 1000);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      if (username.trim() === "" || password.trim() === "") {
        throw new Error("Invalid userName or password");
      }
      const res = await loginService(username, password).then((res) => {
        if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);
        return res.json();
      });

      dispatch({ type: "signIn", value: res.access_token });
    } catch (error) {
      console.log(error);
      dispatch({ type: "errorLogged", value: String(error) });
    }
  };

  return (
    <CustomContext.Provider
      value={{ accessState: state, accessDispatch: dispatch, login }}
    >
      {children}
    </CustomContext.Provider>
  );
};

export default AccessProvider;
