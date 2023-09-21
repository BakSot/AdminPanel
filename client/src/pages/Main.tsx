import { Grid } from "@mui/material";
import UserForm from "../components/UserForm";
import UsersAvatar from "../components/UsersAvatas";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectAllUsers, getAllUsers, selectUser } from "../store/users-slice";
import { useSelector } from "react-redux";
import { json, useRouteLoaderData } from "react-router-dom";

/**
 * Interfaces
 */
export interface UsersDetails {
  address: string;
  company: string;
  email: string;
  id: string;
  name: string;
  phone: string;
  photo: string;
}

export interface UsersDetailsInterface extends Array<UsersDetails> {}

const Main = () => {
  /**
   * Hooks
   */
  const usersDetailts = useRouteLoaderData("users-details") as UsersDetails[];

  const dispatch = useDispatch();
  const savedUsers = useSelector(selectAllUsers);
  const userDetails = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetches users' data and stores them into Redux
   */
  const fetchUsersHandler = useCallback(async () => {
    setIsLoading(true);

    usersDetailts?.map((u) => {
      const existingUser = savedUsers?.find((userId) => userId?.id === u?.id);
      if (!existingUser) {
        const usersStore = {
          email: u?.email,
          id: u?.id,
          name: u?.name,
          photo: u?.photo,
        };
        dispatch(getAllUsers(usersStore));
        setIsLoading(false);
      }
    });
  }, []);

  /**
   * Effects
   */
  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  return (
    <Grid container>
      <Grid item xs={3} md={6}>
        <UsersAvatar />
      </Grid>
      <Grid item xs={9} md={6}>
        {userDetails?.id ? (
          <>
            <UserForm />
          </>
        ) : (
          <>
            {!isLoading && <div> Select a user to edit </div>}
            {isLoading && <p> Loading...</p>}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Main;

/**
 * Get Request
 * @returns response
 */
export async function loader() {
  const response = await fetch("http://localhost:3000/users");
  if (!response.ok) {
    return json({ message: "Could not fetch users" }, { status: 500 });
  } else {
    return response;
  }
}
