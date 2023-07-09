import { Fragment } from "react";
import List from "@mui/material/List";
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

export default function UsersAvatar() {
  const userDetails = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const selectedIndex = useSelector(selectClickedUser);

  const fetchUserHandler = async (id: string) => {
    const requestOptions = {
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`/users/${id}`, requestOptions);
    const data = await response.json();
    dispatch(getUser(data));
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    u_id: string
  ) => {
    const selectedUser = {
      index: index,
    };
    dispatch(openUser(selectedUser));
    fetchUserHandler(u_id);
  };

  return (
    <>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 400,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        <li key={`section-${"sectionId"}`}>
          <ul>
            {userDetails.map((user, index) => (
              <ListItemButton
                selected={selectedIndex.index === index}
                onClick={(event) => handleListItemClick(event, index, user.id)}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar alt="Travis Howard" src={user.photo} />
                </ListItemAvatar>
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
              </ListItemButton>
            ))}
          </ul>
        </li>
      </List>
    </>
  );
}
