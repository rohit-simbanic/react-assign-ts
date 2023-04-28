import { createContext, useContext, useReducer } from "react";

import {
  IAuth,
  IAuthState,
  AuthActionTypeEnum,
  IAuthContext,
} from "../types/Types";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContextAPI = createContext<IAuthContext>({
  activeAuth: [],
  setAuth: () => {},
  dispatch: () => {},
});
export type AuthProviderProps = {
  children: React.ReactNode;
};
// reducer
const reducer = (state: IAuthState, action: any) => {
  console.log(state);
  console.log(action);
  let activeAuth: IAuth[];
  switch (action.type) {
    // add action case
    case AuthActionTypeEnum.LOGIN:

    // delete action case
    case AuthActionTypeEnum.LOGOUT:
  }
  return { ...state };
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useLocalStorage<IAuth[]>("auth-status", []);
  const data: IAuthState = { activeAuth: auth };
  const [state, dispatch] = useReducer(reducer, data);
  console.log(state);
  return (
    <AuthContextAPI.Provider
      value={{
        activeAuth: state.activeAuth,
        setAuth,
        dispatch,
      }}
    >
      {children}
    </AuthContextAPI.Provider>
  );
};
// custom hook for useContext

const useAuthCustomContext = () => {
  return useContext(AuthContextAPI);
};

export { AuthContextAPI, AuthProvider, useAuthCustomContext };
