import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../store/users-slice";
import FormTextField from "./form/FormTextField";

const UserForm = () => {
  const userDetails = useSelector(selectUser);

  return (
    <Grid container paddingLeft={"40px"}>
      <Grid xs={12}>
        <FormTextField
          name={userDetails.name}
          email={userDetails.email}
          phone={userDetails.phone}
          address={userDetails.address}
          company={userDetails.company}
        />
      </Grid>
    </Grid>
  );
};

export default UserForm;
