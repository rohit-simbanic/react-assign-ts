import { createContext, useContext, useReducer } from "react";

import { IAuth, IAuthState, IAuthContext } from "../types/Types";
import reducerAuth from "./ReducerAuth";

const AuthContextAPI = createContext<IAuthContext>({
  activeAuth: [],
  dispatch: () => {},
});
export type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth: IAuth[] = [{ auth: "false" }];
  const data: IAuthState = { activeAuth: auth };
  const [state, dispatch] = useReducer(reducerAuth, data);
  console.log(state);
  return (
    <AuthContextAPI.Provider
      value={{
        activeAuth: state.activeAuth,
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
