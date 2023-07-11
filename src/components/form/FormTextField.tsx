import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import InputLabel from "@mui/material/InputLabel";
import { Input } from "../styled";
import FormControl from "@mui/material/FormControl";

interface IUserDetails {
  name: string | undefined;
  email: string | undefined;
  address: string | undefined;
  phone: string | undefined;
  company: string | undefined;
}

const FormTextField = ({
  name,
  email,
  address,
  phone,
  company,
}: IUserDetails) => {
  const {
    register,
    control,
    getFieldState,
    formState: { isDirty },
    reset,
  } = useForm({
    defaultValues: {
      name: name,
      email: email,
      address: address,
      phone: phone,
      company: company,
    },
  });

  useEffect(() => {
    reset({
      name: name,
      email: email,
      phone: phone,
      address: address,
      company: company,
    });
  }, [name, email]);

  const nameState = getFieldState("name");
  const emailState = getFieldState("email");
  const addressState = getFieldState("address");
  const phoneState = getFieldState("phone");
  const companyState = getFieldState("company");

  console.log("nameState", nameState.isDirty);
  console.log("emailState", emailState.isDirty);

  return (
    <>
      <DevTool control={control} />
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="name-input">
          Name
        </InputLabel>
        <Input id="name-input" {...register("name")} name="name" />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="email-input">
          E-mail Address
        </InputLabel>
        <Input id="email-input" {...register("email")} name="email" />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel shrink htmlFor="phone-input">
          Phone
        </InputLabel>
        <Input id="phone-input" {...register("phone")} name="phone" />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel shrink htmlFor="address-input">
          Address
        </InputLabel>
        <Input id="address-input" {...register("address")} name="address" />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel shrink htmlFor="company-input">
          Company
        </InputLabel>
        <Input id="company-input" {...register("company")} name="company" />
      </FormControl>
    </>
  );
};
export default FormTextField;
