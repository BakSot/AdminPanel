import { Container, Grid } from "@mui/material";
import UserForm from "../components/UserForm";
import UsersAvatar from "../components/UsersAvatas";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectAllUsers, getAllUsers, selectUser } from "../store/users-slice";
import { useSelector } from "react-redux";
import { json, useLoaderData, useRouteLoaderData } from "react-router-dom";

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
  const usersDetailts: any = useLoaderData();
  const dispatch = useDispatch();
  const savedUsers = useSelector(selectAllUsers);
  const userDetails = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
  console.log("MAIN");

  const fetchUsersHandler = useCallback(async () => {
    setIsLoading(true);

    const myUsers: UsersDetails[] = usersDetailts?.users;

    myUsers?.map((u) => {
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
        <Grid item xs={3} md={6}>
          <UsersAvatar />
        </Grid>
        <Grid item xs={9} md={6}>
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

export async function loader() {
  const response = await fetch("http://localhost:3000/users");
  if (!response.ok) {
    return json({ message: "Could not fetch users" }, { status: 500 });
  } else {
    return response;
  }
}
