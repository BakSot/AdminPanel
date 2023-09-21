import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import {
  selectToggleBtn,
  handleCancelButton,
  toggleSaveBtn,
} from "../store/users-slice";
import { useDispatch } from "react-redux";
import { CancelButton, SaveButton } from "./styled";
import { FieldErrors } from "react-hook-form";

/**
 * Interfaces
 */
interface IActionButtons {
  errors: FieldErrors<{
    name: string;
    email: string | undefined;
    address: string | undefined;
    phone: string;
    company: string | undefined;
  }>;
}

/**
 * Shows Save & Cancel Buttons
 * @param param0 IActionButtons
 * @returns JSX.Element
 */
const ActionButtons = ({ errors }: IActionButtons) => {
  /**
   * Hooks
   */
  const dispatch = useDispatch();
  const isFormDirty: boolean = useSelector(selectToggleBtn);

  /**
   * Save button handler
   */
  const saveBtnHandler = () => {
    setTimeout(() => {
      if (!errors) {
        dispatch(toggleSaveBtn(false));
      }
    }, 500);
  };

  /**
   * Cancel Button Handler
   */
  const cancelBtnHandler = () => {
    dispatch(handleCancelButton(true));
  };
  console.log(errors);
  return (
    <Stack spacing={1} direction="row-reverse" paddingTop={"20px"}>
      <SaveButton
        variant="contained"
        type="submit"
        onClick={saveBtnHandler}
        disabled={!isFormDirty}
      >
        Save
      </SaveButton>
      {isFormDirty && (
        <CancelButton onClick={cancelBtnHandler}>Cancel</CancelButton>
      )}
    </Stack>
  );
};

export default ActionButtons;
