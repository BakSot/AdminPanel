import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

export interface IUsers {
  email: string;
  id: string;
  name: string;
  photo: string;
}
export interface IUserForm extends IUsers {
  address: string;
  company: string;
  phone: string;
}

export interface ISelectedUser {
  index?: number;
}

export interface IClasses {
  getAllUsers: IUsers[];
  getUser: IUserForm;
  selectedUser: ISelectedUser;
  isFormDirty: boolean;
}

const initialState: IClasses = {
  getAllUsers: [],
  getUser: {
    email: "",
    id: "",
    name: "",
    photo: "",
    address: "",
    company: "",
    phone: "",
  },
  selectedUser: { index: undefined },
  isFormDirty: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getAllUsers: (state: IClasses, action: PayloadAction<IUsers>) => {
      state.getAllUsers = [...state.getAllUsers, action.payload];
    },
    getUser: (state: IClasses, action: PayloadAction<IUserForm>) => {
      state.getUser = action.payload;
    },
    openUser: (state: IClasses, action: PayloadAction<ISelectedUser>) => {
      state.selectedUser = action.payload;
    },
    toggleSaveBtn: (state: IClasses, action: PayloadAction<boolean>) => {
      state.isFormDirty = action.payload;
    },
  },
});

export const { getAllUsers, getUser, openUser, toggleSaveBtn } =
  usersSlice.actions;

export const selectAllUsers = (state: RootState) => state.users.getAllUsers;
export const selectUser = (state: RootState) => state.users.getUser;
export const selectClickedUser = (state: RootState) => state.users.selectedUser;
export const selectToggleBtn = (state: RootState) => state.users.isFormDirty;

export default usersSlice.reducer;
