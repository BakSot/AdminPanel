import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectToggleBtn, handleCancelButton, toggleSaveBtn } from "../store/users-slice";
import { useDispatch } from "react-redux";

interface IActionButtons {
  id: string;
}

const ActionButtons = ({ id }: IActionButtons) => {
  const dispatch = useDispatch();
  const isFormDirty = useSelector(selectToggleBtn);

  const saveBtnHandler = () => {
    dispatch(toggleSaveBtn(false));
  };

  const cancelBtnHandler = () => {
    dispatch(handleCancelButton(true));
  };

  return (
    <Stack spacing={1} direction="row-reverse" paddingTop={"20px"}>
      <Button
        variant="contained"
        disabled={!isFormDirty}
        type="submit"
        onClick={saveBtnHandler}
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
