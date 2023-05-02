import { v4 as uuidv4 } from "uuid";
import {
  ActionTypeEnum,
  IReducerAction,
  IUser,
  IUserState,
} from "../types/Types";
// reducer
const reducer = (state: IUserState, action: IReducerAction) => {
  let activeUsers: IUser[];
  switch (action.type) {
    // add action case
    case ActionTypeEnum.Add:
      const { users } = action;
      users.id = uuidv4().slice(0, 4);
      return { ...state, activeUsers: [action.users, ...state.activeUsers] };
    // delete action case
    case ActionTypeEnum.Delete:
      activeUsers = state.activeUsers;
      const filteredTask = activeUsers.filter(
        (item) => item.id !== action.users.id
      );
      return { ...state, activeUsers: filteredTask };
    // update case
    case ActionTypeEnum.Update:
      activeUsers = state.activeUsers;
      console.log(action);
      let index = activeUsers.findIndex((x) => x.id === action.data.id);
      if (index >= 0) {
        activeUsers[index] = action.data;
      }
      console.log(activeUsers, action.data);
      return { activeUsers };
  }
  return { ...state };
};

export default reducer;
