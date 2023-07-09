import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function ActionButtons() {
  return (
    <Stack spacing={1} direction="row-reverse" paddingTop={"20px"}>
      <Button variant="contained" disabled={true}>
        Save
      </Button>
      <Button variant="outlined">Cancel</Button>
    </Stack>
  );
}
