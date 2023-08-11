// Layouts
import { HeaderOnly } from "../components/Layouts";

// React components
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";
import { Profile } from "../pages/Profile";

// public route
const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/products", component: ProductsPage },
  { path: "/profile", component: Profile, layout: HeaderOnly },
  { path: "/login", component: LoginPage, layout: null },
];

// private route
const privateRoutes = [];

export { publicRoutes, privateRoutes };
