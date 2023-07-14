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
import { json, useRouteLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UsersAvatar() {
  const desktop = useMediaQuery("(min-width:600px)");
  const fetchedUsers: any = useRouteLoaderData("users-details");
  const selectedUser: any = useRouteLoaderData("selected-user");

  const usersDetails = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const selectedIndex = useSelector(selectClickedUser);

  console.log("fetchedUsers", fetchedUsers);
  console.log("selectedUser", selectedUser);

  /**
   * Handles the selection of user on click
   */
  const handleListItemClick = (index: number) => {
    const opendUser = {
      index: index,
    };
    dispatch(openUser(opendUser));
  };

  useEffect(() => {
    dispatch(getUser(selectedUser));
    console.log("USE EFFECT @ AVATAR");
  }, [selectedUser]);

  return (
    <StyledList desktop={desktop.toString()} subheader={<li />}>
      <li key={`section-${"sectionId"}`}>
        <ul>
          {usersDetails.map((user, index) => (
            <Link
              to={`/users/${user.id}`}
              style={{ textDecoration: "none", color: "black" }}
              key={index}
            >
              <ListItemButton
                selected={selectedIndex.index === index}
                onClick={() => handleListItemClick(index)}
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

/**
 * Get Request for selected User
 * @param param0 id
 * @returns response
 */
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
