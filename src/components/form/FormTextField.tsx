import { useForm, Form } from "react-hook-form";
import { useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import InputLabel from "@mui/material/InputLabel";
import { Input } from "../styled";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  handleCancelButton,
  selectCancelButton,
  toggleSaveBtn,
} from "../../store/users-slice";
import ActionButtons from "../ActionButtons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormHelperText } from "@mui/material";

const schema = yup.object({
  name: yup.string().required("Name is required").max(15),
  email: yup.string().email("Fill in a valid email address"),
  phone: yup.string().required("Phone is required"),
  address: yup.string(),
  company: yup.string(),
});

interface IUserDetails {
  name: string;
  email: string;
  address: string;
  phone: string;
  company: string;
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
    formState: { isDirty, errors },
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
    resolver: yupResolver(schema),
  });
  const watchAllFields = watch();

  useEffect(() => {
    reset({
      name: name,
      email: email,
      address: address,
      phone: phone,
      company: company,
    });
    dispatch(handleCancelButton(false));
  }, [name, email, phone, address, company, resetForm]);

  dispatch(toggleSaveBtn(isDirty));

  const updatedUser: any = { ...watchAllFields, id, photo: "dd" };

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
      <FormControl variant="standard" required>
        <InputLabel
          shrink
          htmlFor="name-input"
          sx={{ color: errors.name && "red" }}
        >
          Name
        </InputLabel>
        <Input id="name-input" {...register("name")} name="name" />
        <FormHelperText sx={{ color: "red" }}>
          {errors.name?.message}
        </FormHelperText>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="email-input">
          E-mail Address
        </InputLabel>
        <Input id="email-input" {...register("email")} name="email" />
        <FormHelperText sx={{ color: "red" }}>
          {errors.email?.message}
        </FormHelperText>
      </FormControl>

      <FormControl variant="standard" required>
        <InputLabel shrink htmlFor="phone-input">
          Phone
        </InputLabel>
        <Input id="phone-input" {...register("phone")} name="phone" />
        <FormHelperText sx={{ color: "red" }}>
          {errors.phone?.message}
        </FormHelperText>
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
      <ActionButtons id={id} errors={errors}/>
    </Form>
  );
};
export default FormTextField;
