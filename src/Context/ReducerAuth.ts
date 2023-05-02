import { IAuthState, AuthActionTypeEnum } from "../types/Types";

// reducer
const reducerAuth = (state: IAuthState, action: any) => {
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

export default reducerAuth;
