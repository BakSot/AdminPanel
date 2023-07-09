import "./App.css";
import { loader as getUsers } from "./pages/GetUsers";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import Main from "./pages/Main";
import { Provider } from "react-redux";
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/users",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Main /> },
      {
        path: ":uid",
        id: "users-accounts",
        loader: getUsers,
        children: [
          {
            index: true,
            element: <Main />,
            loader: getUsers,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
