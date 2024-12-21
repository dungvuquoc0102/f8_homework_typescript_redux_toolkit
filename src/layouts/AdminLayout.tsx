import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const nav = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (localUser.role !== "admin") {
      nav("/");
    } else {
      setUser(localUser);
    }
  }, []);
  function handleLogout() {
    if (confirm("Logout?")) {
      localStorage.setItem("user", "{}");
      nav("/");
    }
  }
  return (
    <div>
      <header>
        <div className="flex items-center justify-between container mx-auto py-3 border-b">
          <Link className="font-bold" to="/admin">
            Logo
          </Link>
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/product-add">Add product</NavLink>
              </li>
            </ul>
          </nav>
          <div>
            <span>Hello {user.email?.split("@")[0]}</span>
            <button
              className="bg-green-500 rounded-md ml-3 p-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
