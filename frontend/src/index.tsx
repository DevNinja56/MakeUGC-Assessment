import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "./styles/index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { store } from "./store";
import { ALL_ROUTES } from "./routes/constant,route";
import LoaderSpinner from "./components/common/loaderSpinner";
import Layout from "./routes/Layout";
import "react-modern-drawer/dist/index.css";

const Main = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      ALL_ROUTES.map(({ path, element: Component, isPrivate }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout isPrivate={isPrivate}>
              <Suspense
                fallback={
                  <div className="min-h-screen w-screen flex items-center justify-center">
                    <LoaderSpinner />
                  </div>
                }
              >
                <Component />
              </Suspense>
            </Layout>
          }
        />
      ))
    )
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
