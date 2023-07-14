import { useEffect } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import {
  openUser,
  selectClickedUser,
  selectAllUsers,
  getUser,
} from "../store/users-slice";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { StyledButtonList, StyledList } from "./styled";
import { json, useRouteLoaderData } from "react-router-dom";
import { NavLink } from "react-router-dom";

/**
 * List of Users
 * @returns JSX.Element
 */
export default function UsersAvatar() {
  /**
   * Hooks
   */
  const desktop = useMediaQuery("(min-width:600px)");
  const fetchedUsers: any = useRouteLoaderData("users-details");
  const selectedUser: any = useRouteLoaderData("selected-user");
  const usersDetails = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const selectedIndex = useSelector(selectClickedUser);

  /**
   * Handles the selection of user on click
   */
  const handleListItemClick = (index: number) => {
    const opendUser = {
      index: index,
    };
    dispatch(openUser(opendUser));
  };

  /**
   * Effects
   */
  useEffect(() => {
    dispatch(getUser(selectedUser));
  }, [selectedUser]);

  return (
    <StyledList desktop={desktop.toString()} subheader={<li />}>
      <li key={`section-${"sectionId"}`}>
        <ul>
          {usersDetails?.map((user, index) => (
            <NavLink
              to={`/users/${user?.id}`}
              style={({ isActive }) => ({
                color: isActive ? "white" : "black",
                textDecoration: "none",
              })}
              key={index}
            >
              <StyledButtonList
                selected={selectedIndex?.index === index}
                onClick={() => handleListItemClick(index)}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar alt="Travis Howard" src={user?.photo} />
                </ListItemAvatar>
                {desktop ? (
                  <ListItemText
                    primary={user?.name}
                    secondary={
                      <Typography variant={"body2"}>{user?.email}</Typography>
                    }
                  />
                ) : null}
              </StyledButtonList>
            </NavLink>
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
  const id = params?.uid;
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
