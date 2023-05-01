import { createContext, useContext, useReducer } from "react";

import {
  IAuth,
  IAuthState,
  AuthActionTypeEnum,
  IAuthContext,
} from "../types/Types";

const AuthContextAPI = createContext<IAuthContext>({
  activeAuth: [],
  dispatch: () => {},
});
export type AuthProviderProps = {
  children: React.ReactNode;
};
// reducer
const reducer = (state: IAuthState, action: any) => {
  switch (action.type) {
    // add action case
    case AuthActionTypeEnum.LOGIN:
      return { activeAuth: [action.data] };

    // delete action case
    case AuthActionTypeEnum.LOGOUT:
      return { activeAuth: [action.data] };
  }
  return { ...state };
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth: IAuth[] = [{ auth: "false" }];
  const data: IAuthState = { activeAuth: auth };
  const [state, dispatch] = useReducer(reducer, data);
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
