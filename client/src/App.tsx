import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import UsersRootLayout from "./pages/UsersRoot";
import ErrorPage from "./pages/Error";
import { Provider } from "react-redux";
import { store } from "./store";

const Main = lazy(() => import("./pages/Main"));
const HomePage = lazy(() => import("./pages/HomePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: <UsersRootLayout />,
        loader: () => import("./pages/Main").then((module) => module.loader()),
        id: "users-details",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Main />
              </Suspense>
            ),
          },
          {
            path: ":uid",
            id: "selected-user",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <Main />
              </Suspense>
            ),
            loader: (meta) =>
              import("./components/UsersAvatas").then((module) =>
                module.loader(meta)
              ),
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
