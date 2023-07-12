import { Grid, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../store/users-slice";
import FormTextField from "./form/FormTextField";

const UserForm = () => {
  const userDetails = useSelector(selectUser);
  const desktop = useMediaQuery("(min-width:600px)");
  return (
    <>
      <Grid container paddingLeft={desktop ? "40px" : "20px"}>
        <Grid item xs={12}>
          <FormTextField
            name={userDetails.name}
            email={userDetails.email}
            phone={userDetails.phone}
            address={userDetails.address}
            company={userDetails.company}
            id={userDetails.id}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default UserForm;
