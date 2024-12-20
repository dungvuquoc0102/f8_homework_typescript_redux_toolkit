import { Link, NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  function handleLogout() {}
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
            Hello, Dung
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
