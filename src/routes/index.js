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
import CourseDetailsUser from "../pages/CourseDetailsPage";
import Learn from "../pages/Learn";
import HomePageAdmin from "../pages/admin/HomePage";
import AdminLayout from "../layouts/admin/AdminLayout";
import CoursesPage from "../pages/admin/CousePage";
import BlogsPage from "../pages/admin/BlogsPage";
import CourseDetailsAdmin from "../pages/admin/CourseDetails";

// public route
const publicRoutes = [
  { path: routesConfig.home, component: HomePage },

  { path: "/sign-in", component: LoginPage, layout: null },
  { path: "/sign-up", component: RegisterPage, layout: null },
];

// admin route
const adminRoutes = [
  //admin
  { path: "/admin", component: HomePageAdmin, layout: AdminLayout },
  { path: "/admin/courses", component: CoursesPage, layout: AdminLayout },
  { path: "/admin/blogs", component: BlogsPage, layout: AdminLayout },
  {
    path: "/admin/courses/:courseId",
    component: CourseDetailsAdmin,
    layout: AdminLayout,
  },
];

// user route
const userRoutes = [
  //user
  { path: "/blog", component: Blog },
  {
    path: "/learning/:courseId",
    component: Learn,
    layout: null,
  },
  { path: "/courses/:courseId", component: CourseDetailsUser },
  { path: "/products", component: ProductsPage },
  { path: "/profile", component: Profile, layout: HeaderOnly },
];

export { publicRoutes, adminRoutes, userRoutes };
