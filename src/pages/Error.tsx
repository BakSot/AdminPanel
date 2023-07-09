import { CssBaseline, ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useRouteError } from "react-router-dom";

interface errorInterface {
  data: { message: string };
  status: number;
}

const ErrorPage = () => {
  const error: errorInterface = useRouteError() as errorInterface;

  let title = "An error occurred!";
  let message = "Somethiong went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page";
  }

  return (
    <>
      <CssBaseline enableColorScheme />
      <Typography variant="h3" textAlign={"center"} padding="100px">
        {title}
      </Typography>
      <Typography variant="h3" textAlign={"center"}>
        {message}
      </Typography>
    </>
  );
};

export default ErrorPage;
