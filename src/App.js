import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import { publicRoutes, adminRoutes, userRoutes } from "./routes";
import { DefaultLayout } from "./layouts/MainLayout";
import RequireAuth from "./components/RequireAuth";

const ROLES = {
  User: "user",
  Admin: "admin",
};

function App() {
  return (
    <div className="">
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {adminRoutes.map((route, index) => {
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          const Page = route.component;
          return (
            <Route
              key={index}
              element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
            >
              <Route
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            </Route>
          );
        })}
        {userRoutes.map((route, index) => {
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          const Page = route.component;
          return (
            <Route
              key={index}
              element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
            >
              <Route
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            </Route>
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
