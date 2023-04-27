import React, { Dispatch } from "react";

export type IUserDispatch = {
  dispatch: Dispatch<any>;
};
export interface IUser {
  id: string;
  username: string;
  email: string;
  phone: string;
}

export interface IUserContext {
  activeUsers: IUser[];
  dispatch: Dispatch<any>;
}

export interface IUserState {
  activeUsers: IUser[];
}

export enum ActionTypeEnum {
  Add = "add",
  Delete = "delete",
  Update = "update",
}

export interface IAddAction {
  type: ActionTypeEnum.Add;
  users: IUser;
}
export interface IDeleteAction {
  type: ActionTypeEnum.Delete;
  users: { id: string };
}

// export interface IUpdateAction {
//   type: ActionTypeEnum.Update;
//   data: ITask;
// }

export type IReducerAction = IAddAction | IDeleteAction;