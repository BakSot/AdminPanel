import { Fragment, useEffect } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import { useSelector } from "react-redux";
import {
  openUser,
  selectClickedUser,
  selectAllUsers,
  getUser,
} from "../store/users-slice";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { StyledList } from "./styled";
import { json, useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UsersAvatar() {
  const desktop = useMediaQuery("(min-width:600px)");
  const fetchedUsers: any = useLoaderData();
  const usersDetails = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const selectedIndex = useSelector(selectClickedUser);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    u_id: string
  ) => {
    const selectedUser = {
      index: index,
    };
    dispatch(openUser(selectedUser));
  };

  useEffect(() => {
    dispatch(getUser(fetchedUsers));
  }, [fetchedUsers]);

  return (
    <StyledList desktop={desktop.toString()} subheader={<li />}>
      <li key={`section-${"sectionId"}`}>
        <ul>
          {usersDetails.map((user, index) => (
            <Link
              to={user.id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemButton
                key={index}
                selected={selectedIndex.index === index}
                onClick={(event) => handleListItemClick(event, index, user.id)}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar alt="Travis Howard" src={user.photo} />
                </ListItemAvatar>
                {desktop ? (
                  <ListItemText
                    primary={user.name}
                    secondary={
                      <Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {user.email}
                        </Typography>
                      </Fragment>
                    }
                  />
                ) : null}
              </ListItemButton>
            </Link>
          ))}
        </ul>
      </li>
    </StyledList>
  );
}

export async function loader({ params }: { params: any }) {
  const id = params.uid;
  const response = await fetch(`/users/${id}`);
  if (!response.ok) {
    return json(
      { message: "Could not fetch the selected user" },
      { status: 500 }
    );
  } else {
    return response;
  }
}
