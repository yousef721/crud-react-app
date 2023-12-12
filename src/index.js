import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Pages/RootLayout";
import Index from "./Pages/Index";
import ErrorPage from "./Pages/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./State";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const AddPost = React.lazy(() => import("./Pages/AddPost"));
const Details = React.lazy(() => import("./Pages/Details"));
const EditPost = React.lazy(() => import("./Pages/EditPost"));

const postParamHandler = ({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("Bad Request", {
      statusText: "Please Make Sure To insert Correct ID",
      status: 400,
    });
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "post", element: <Index /> },
      {
        path: "post/add",
        element: (
          <Suspense fallback="Loading...">
            <AddPost />
          </Suspense>
        ),
      },
      {
        path: "post/:id",
        element: (
          <Suspense fallback="Loading...">
            <Details />
          </Suspense>
        ),
        loader: postParamHandler,
      },
      {
        path: "post/:id/edit",
        element: (
          <Suspense fallback="Loading...">
            <EditPost />
          </Suspense>
        ),
        loader: postParamHandler,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
