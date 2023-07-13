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
  selectUser,
  toggleSaveBtn,
} from "../../store/users-slice";
import ActionButtons from "../ActionButtons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormHelperText, useMediaQuery } from "@mui/material";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Fill in a valid email address"),
  phone: yup.string().required("Phone is required"),
  address: yup.string(),
  company: yup.string(),
});

// interface IUserDetails {
//   name: string;
//   email?: string;
//   address?: string;
//   phone: string;
//   company?: string;
//   id: string;
//   photo?: string;
// }

const FormTextField = ({
  name,
  email,
  address,
  phone,
  company,
  id,
  photo,
}: IUserForm) => {
  const dispatch = useDispatch();
  const resetForm = useSelector(selectCancelButton);
  const desktop = useMediaQuery("(min-width:600px)");

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

  const updatedUser: IUserForm = { ...watchAllFields, id, photo };

  return (
    <Form
      action={`${id}`}
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
        <Input
          id="name-input"
          desktop={desktop.toString()}
          {...register("name")}
          name="name"
        />
        <FormHelperText sx={{ color: "red" }}>
          {errors.name?.message}
        </FormHelperText>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="email-input">
          E-mail Address
        </InputLabel>
        <Input
          id="email-input"
          desktop={desktop.toString()}
          {...register("email")}
          name="email"
        />
        <FormHelperText sx={{ color: "red" }}>
          {errors.email?.message}
        </FormHelperText>
      </FormControl>

      <FormControl variant="standard" required>
        <InputLabel shrink htmlFor="phone-input">
          Phone
        </InputLabel>
        <Input
          id="phone-input"
          desktop={desktop.toString()}
          {...register("phone")}
          name="phone"
        />
        <FormHelperText sx={{ color: "red" }}>
          {errors.phone?.message}
        </FormHelperText>
      </FormControl>

      <FormControl variant="standard">
        <InputLabel shrink htmlFor="address-input">
          Address
        </InputLabel>
        <Input
          id="address-input"
          desktop={desktop.toString()}
          {...register("address")}
          name="address"
        />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel shrink htmlFor="company-input">
          Company
        </InputLabel>
        <Input
          id="company-input"
          desktop={desktop.toString()}
          {...register("company")}
          name="company"
        />
      </FormControl>
      <ActionButtons id={id} errors={errors} />
    </Form>
  );
};
export default FormTextField;
