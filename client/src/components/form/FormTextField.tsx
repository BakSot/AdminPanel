import { useForm, Form } from "react-hook-form";
import { useEffect } from "react";
import { DevTool } from "@hookform/devtools";
import InputLabel from "@mui/material/InputLabel";
import { Input, StyledFormHelperText } from "../styled";
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMediaQuery } from "@mui/material";

/**
 * Validation schema for the form
 */
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Fill in a valid email address"),
  phone: yup.string().required("Phone is required"),
  address: yup.string(),
  company: yup.string(),
});

/**
 * Application Form
 * @param param0 IUserForm
 * @returns JSX.Element
 */
const FormTextField = ({
  name,
  email,
  address,
  phone,
  company,
  id,
  photo,
}: IUserForm) => {
  /**
   * Hooks
   */
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

  /**
   * Effects
   */
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

  useEffect(() => {
    dispatch(toggleSaveBtn(isDirty));
  }, [isDirty]);

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
        <InputLabel shrink htmlFor="name-input">
          Name
        </InputLabel>
        <Input
          id="name-input"
          desktop={desktop.toString()}
          {...register("name")}
          name="name"
        />
        <StyledFormHelperText>{errors?.name?.message}</StyledFormHelperText>
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
        <StyledFormHelperText>{errors?.email?.message}</StyledFormHelperText>
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
        <StyledFormHelperText>{errors?.phone?.message}</StyledFormHelperText>
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
      <ActionButtons errors={errors} />
    </Form>
  );
};
export default FormTextField;
