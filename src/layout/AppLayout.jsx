import { Outlet } from "react-router-dom";

import AppHeader from "../components/AppHeader";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

const AppLayout = ({ products, carts, setToken }) => {
  return (
    <div className="app-container">
      <AppHeader />
      <AppNavbar products={products} carts={carts} setToken={setToken} />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

export default AppLayout;