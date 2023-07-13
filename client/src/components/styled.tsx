import { InputBase, alpha, styled, List } from "@mui/material";

export const Input = styled(InputBase)<{ desktop: string }>(
  ({ theme, desktop }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
      border: "1px solid",
      borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
      fontSize: 16,
      width: desktop === "true" ? "500px" : "200px",
      padding: "10px 0 12px 0 ",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  })
);

export const StyledList = styled(List)<{ desktop: string }>(({ desktop }) => ({
  width: "100%",
  bgcolor: "background.paper",
  position: "relative",
  overflow: "auto",
  maxHeight: desktop ==='true' ? 400 : "100%",
  "& ul": { padding: 0 },
}));
