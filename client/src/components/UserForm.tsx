import { Grid, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../store/users-slice";
import FormTextField from "./form/FormTextField";
import { StyledGrid } from "./styled";

/**
 * Sends values to the form
 * @returns JSX.Element
 */
const UserForm = () => {
  /**
   * Hooks
   */
  const userDetails = useSelector(selectUser);
  const desktop = useMediaQuery("(min-width:600px)");

  return (
    <>
      <StyledGrid container desktop={desktop.toString()}>
        <Grid item xs={12}>
          <FormTextField
            name={userDetails.name}
            email={userDetails.email}
            phone={userDetails.phone}
            address={userDetails.address}
            company={userDetails.company}
            id={userDetails.id}
            photo={userDetails.photo}
          />
        </Grid>
      </StyledGrid>
    </>
  );
};

export default UserForm;
