import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import {
  selectToggleBtn,
  selectCancelButton,
  handleCancelButton,
} from "../store/users-slice";
import { useDispatch } from "react-redux";

const ActionButtons = () => {
  const dispatch = useDispatch();
  const isFormDirty = useSelector(selectToggleBtn);

  const saveBtnHandler = () => {};

  const cancelBtnHandler = () => {
    dispatch(handleCancelButton(true));
  };

  return (
    <Stack spacing={1} direction="row-reverse" paddingTop={"20px"}>
      <Button
        variant="contained"
        disabled={!isFormDirty}
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
