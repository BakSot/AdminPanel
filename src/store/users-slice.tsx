import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

export interface IUser {
  address: string;
  company: string;
  email: string;
  id: string;
  name: number;
  phone: string;
  photo: string;
}

export interface ISelectedUser {
  index: number;
  id: string;
}

export interface IClasses {
  showUsersProfile: IUser[];
  selectedUser: ISelectedUser;
}

const initialState: IClasses = {
  showUsersProfile: [],
  selectedUser: { index: 0, id: "" },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    showUsersProfile: (state: IClasses, action: PayloadAction<IUser>) => {
      state.showUsersProfile = [...state.showUsersProfile, action.payload];
    },
    openUser: (state: IClasses, action: PayloadAction<ISelectedUser>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { showUsersProfile, openUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.showUsersProfile;
export const selectClickedUser = (state: RootState) => state.users.selectedUser;

export default usersSlice.reducer;
