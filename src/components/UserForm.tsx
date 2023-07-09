import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Input } from "./styled";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../store/users-slice";
import { useEffect, useState } from "react";
import { useForm, Form } from "react-hook-form";

const UserForm = () => {
  const userDetails = useSelector(selectUser);
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [company, setCompany] = useState<string>();

  const handleTextFieldValues = () => {
    if (userDetails) {
      setUsername(userDetails.name);
      setEmail(userDetails.email);
      setPhone(userDetails.phone);
      setAddress(userDetails.address);
      setCompany(userDetails.company);
    }
  };

  useEffect(() => {
    handleTextFieldValues();
  }, [userDetails]);

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const phoneChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const addressChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };
  const companyChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(event.target.value);
  };

  return (
    <Grid container paddingLeft={"40px"}>
      <Grid xs={12}>
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="name-input">
            Name
          </InputLabel>
          <Input
            id="name-input"
            value={username}
            onChange={nameChangeHandler}
          />
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="email-input">
            Email address
          </InputLabel>
          <Input id="email-input" value={email} onChange={emailChangeHandler} />
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="phone-input">
            Phone
          </InputLabel>
          <Input id="phone-input" value={phone} onChange={phoneChangeHandler} />
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="address-input">
            Address
          </InputLabel>
          <Input
            id="address-input"
            value={address}
            onChange={addressChangeHandler}
          />
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl variant="standard">
          <InputLabel shrink htmlFor="company-input">
            Company
          </InputLabel>
          <Input
            id="company-input"
            value={company}
            onChange={companyChangeHandler}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default UserForm;
