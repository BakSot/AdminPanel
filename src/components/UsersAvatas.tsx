import { Fragment, useState } from "react";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import { useSelector } from "react-redux";
import { openUser, selectClickedUser, selectUsers } from "../store/users-slice";
import { useDispatch } from "react-redux";

export default function UsersAvatar() {
  const userDetails = useSelector(selectUsers);
  const dispatch = useDispatch();
  const selectedIndex = useSelector(selectClickedUser);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    u_id: string
  ) => {
    const selectedUser = {
      index: index,
      id: u_id,
    };
    dispatch(openUser(selectedUser));
  };

  const handleName = () => {
    console.log('userDetails',userDetails)
    console.log('selectedIndex',selectedIndex.index)
    const a = userDetails.find((u) => u.id === selectedIndex.id);
    console.log(a?.name, "sdggsdsgsg");
    return a?.name
  };

  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
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
