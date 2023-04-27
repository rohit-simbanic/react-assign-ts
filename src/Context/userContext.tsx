import { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ActionTypeEnum,
  IReducerAction,
  IUser,
  IUserContext,
  IUserState,
} from "../types/Types";

const UserContext = createContext<IUserContext>({
  activeUsers: [],
  dispatch: () => {},
});
export type UserProviderProps = {
  children: React.ReactNode;
};
// reducer
const reducer = (state: IUserState, action: IReducerAction) => {
  //   console.log(state);
  //   console.log(action);
  let activeUsers: IUser[];
  switch (action.type) {
    case ActionTypeEnum.Add:
      const { users } = action;
      users.id = uuidv4().slice(0, 4);
      return { ...state, activeUsers: [action.users, ...state.activeUsers] };

    case ActionTypeEnum.Delete:
      activeUsers = state.activeUsers;
      const filteredTask = activeUsers.filter(
        (item) => item.id !== action.users.id
      );
      return { ...state, activeUsers: filteredTask };
  }
  return { ...state };
};

const AppProvider = ({ children }: UserProviderProps) => {
  const users: IUser[] = [
    {
      id: "0",
      username: "Vinod",
      email: "rohit@gmail.com",
      phone: "9883221210",
    },
    {
      id: "1",
      username: "Virat",
      email: "virat@gmail.com",
      phone: "9663221210",
    },
    {
      id: "2",
      username: "Rohit",
      email: "rohit@gmail.com",
      phone: "9863221210",
    },
    {
      id: "3",
      username: "Raina",
      email: "raina@gmail.com",
      phone: "9563221210",
    },
    {
      id: "4",
      username: "Ashish",
      email: "ashish@gmail.com",
      phone: "9163221210",
    },
  ];
  const data: IUserState = { activeUsers: users };
  const [state, dispatch] = useReducer(reducer, data);
  console.log(state);
  return (
    <UserContext.Provider
      value={{
        activeUsers: state.activeUsers,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// custom hook for useContext

const useUserCustomContext = () => {
  return useContext(UserContext);
};

export { UserContext, AppProvider, useUserCustomContext };
