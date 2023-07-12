import { useForm, Form } from "react-hook-form";
import { useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import InputLabel from "@mui/material/InputLabel";
import { Input } from "../styled";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import {
    IUserForm,
  getUser,
  handleCancelButton,
  selectCancelButton,
  toggleSaveBtn,
} from "../../store/users-slice";
import ActionButtons from "../ActionButtons";
import Button from "@mui/material/Button";

interface IUserDetails {
  name: string | undefined;
  email: string | undefined;
  address: string | undefined;
  phone: string | undefined;
  company: string | undefined;
  id: string;
}

const FormTextField = ({
  name,
  email,
  address,
  phone,
  company,
  id,
}: IUserDetails) => {
  const dispatch = useDispatch();
  const resetForm = useSelector(selectCancelButton);

  const {
    register,
    control,
    formState: { isDirty },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: name,
      email: email,
      address: address,
      phone: phone,
      company: company,
    },
  });
  const watchAllFields = watch();

  useEffect(() => {
    reset({
      name: name,
      email: email,
      phone: phone,
      address: address,
      company: company,
    });
    dispatch(handleCancelButton(false));
  }, [name, email, phone, address, company, resetForm]);

  dispatch(toggleSaveBtn(isDirty));

  const updatedUser: IUserForm = { ...watchAllFields, id, photo:'dd' };

  return (
    <Form
      action={`users/${id}`}
      control={control}
      method="put"
      onSubmit={() => {
        dispatch(getUser(updatedUser));
      }}
    >
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
      <ActionButtons id={id} />
    </Form>
  );
};
export default FormTextField;
