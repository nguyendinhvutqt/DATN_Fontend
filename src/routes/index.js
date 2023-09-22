// Layouts
import { HeaderOnly } from "../../src/layouts/HeaderOnly";

// React components
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";
import { Profile } from "../pages/Profile";

import routesConfig from "../configs/routes";
import { RegisterPage } from "../pages/register";
import LoginPage from "../pages/LoginPage";
import Blog from "../pages/BlogPage";
import CourseDetails from "../pages/CourseDetailsPage";
import Learn from "../pages/Learn";

// public route
const publicRoutes = [
  { path: routesConfig.home, component: HomePage },
  { path: "/blog", component: Blog },
  {
    path: "/learning/:courseId",
    component: Learn,
    layout: null,
  },
  { path: "/courses/:courseId", component: CourseDetails },
  { path: "/products", component: ProductsPage },
  { path: "/profile", component: Profile, layout: HeaderOnly },
  { path: "/sign-in", component: LoginPage, layout: null },
  { path: "/sign-up", component: RegisterPage, layout: null },
];

// private route
const privateRoutes = [];

export { publicRoutes, privateRoutes };
