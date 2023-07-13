import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import {
  selectToggleBtn,
  handleCancelButton,
  toggleSaveBtn,
} from "../store/users-slice";
import { useDispatch } from "react-redux";

interface IActionButtons {
  id: string;
  errors: any;
}

const ActionButtons = ({ id, errors }: IActionButtons) => {
  const dispatch = useDispatch();
  const isFormDirty: boolean = useSelector(selectToggleBtn);

  const saveBtnHandler = () => {
    setTimeout(() => {
      if (!errors) {
        dispatch(toggleSaveBtn(false));
      }
    }, 500);
  };

  const cancelBtnHandler = () => {
    dispatch(handleCancelButton(true));
  };

  return (
    <Stack spacing={1} direction="row-reverse" paddingTop={"20px"}>
      <Button
        variant="contained"
        type="submit"
        onClick={saveBtnHandler}
        disabled={!isFormDirty}
      >
        Save
      </Button>
      {isFormDirty && (
        <Button variant="outlined" onClick={cancelBtnHandler}>
          Cancel
        </Button>
      )}
    </Stack>
  );
};

export default ActionButtons;
