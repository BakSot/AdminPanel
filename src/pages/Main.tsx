import { Container, Grid } from "@mui/material";
import UserForm from "../components/UserForm";
import UsersAvatar from "../components/UsersAvatas";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectAllUsers, getAllUsers, selectUser } from "../store/users-slice";
import { useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

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
  // const UsersDetails: UsersDetailsInterface = useRouteLoaderData(
  //   "users"
  // ) as UsersDetailsInterface;
  const dispatch = useDispatch();
  const savedUsers = useSelector(selectAllUsers);
  const userDetails = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsersHandler = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch("/users");
    const data = await response.json();
    const myUsers: UsersDetails[] = data.users;

    myUsers.map((u) => {
      const existingUser = savedUsers.find((userId) => userId.id === u.id);
      if (!existingUser) {
        const usersStore = {
          email: u.email,
          id: u.id,
          name: u.name,
          photo: u.photo,
        };
        dispatch(getAllUsers(usersStore));
        setIsLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  return (
    <Container>
      <Grid container>
        <Grid xs={6}>
          <UsersAvatar />
        </Grid>
        <Grid xs={6}>
          {userDetails.id ? (
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
    </Container>
  );
};

export default Main;
