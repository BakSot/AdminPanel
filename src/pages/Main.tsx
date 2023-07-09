import { Container, Grid, selectClasses } from "@mui/material";
import UserForm from "../components/UserForm";
import UsersAvatar from "../components/UsersAvatas";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectUsers, showUsersProfile } from "../store/users-slice";
import { useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

export interface UsersDetails {
  address: string;
  company: string;
  email: string;
  id: string;
  name: number;
  phone: string;
  photo: string;
}

export interface UsersDetailsInterface extends Array<UsersDetails> {}

const Main = () => {
  const UsersDetails: UsersDetailsInterface = useRouteLoaderData(
    "users"
  ) as UsersDetailsInterface;

  const dispatch = useDispatch();
  const savedUsers = useSelector(selectUsers);

  useEffect(() => {
    fetch("/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const myUsers: UsersDetails[] = data.users;

        myUsers.map((u) => {
          const existingUser = savedUsers.find((userId) => userId.id === u.id);
          if (!existingUser) {
            const usersStore = {
              address: u?.address,
              company: u.company,
              email: u.email,
              id: u.id,
              name: u.name,
              phone: u.phone,
              photo: u.photo,
            };
            dispatch(showUsersProfile(usersStore));
          }
        });
      });
  }, []);

  return (
    <Container>
      <Grid container>
        <Grid xs={6}>
          <UsersAvatar />
        </Grid>
        <Grid xs={6}>
          <UserForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
