import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { BootstrapInput } from "./styled";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectClickedUser, selectUsers } from "../store/users-slice";

const UserForm = () => {
  const userDetails = useSelector(selectUsers);
  const selectedIndex = useSelector(selectClickedUser);

  const handleName = () => {
    console.log('userDetails',userDetails)
    console.log('selectedIndex',selectedIndex.index)
    const a = userDetails.find((u) => u.id === selectedIndex.id);
    console.log(a?.name, "sdggsdsgsg");
    return a?.name
  };

  return (
    <Grid container>
      <Grid xs={12}>
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="name-input">
            Name
          </InputLabel>
          <BootstrapInput
            defaultValue={handleName}
            id="name-input"
          />
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="email-input">
            Email address
          </InputLabel>
          <BootstrapInput id="email-input" />
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="phone-input">
            Phone
          </InputLabel>
          <BootstrapInput id="phone-input" />
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="address-input">
            Address
          </InputLabel>
          <BootstrapInput id="address-input" />
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="company-input">
            Company
          </InputLabel>
          <BootstrapInput id="company-input" />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default UserForm;
