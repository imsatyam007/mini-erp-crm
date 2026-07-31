import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menus = [
    {
      name: "Dashboard",
      path: "/",
      roles: ["ADMIN", "SALES", "WAREHOUSE", "ACCOUNTS"],
    },
    {
      name: "Customers",
      path: "/customers",
      roles: ["ADMIN", "SALES"],
    },
    {
      name: "Products",
      path: "/products",
      roles: ["ADMIN", "WAREHOUSE"],
    },
    {
      name: "Inventory",
      path: "/inventory",
      roles: ["ADMIN", "WAREHOUSE"],
    },
    {
      name: "Sales Challans",
      path: "/challans",
      roles: ["ADMIN", "SALES"],
    },
  ];

  const filteredMenus = menus.filter((menu) =>
    menu.roles.includes(user?.role ?? "")
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 flex flex-col justify-between"
      style={{ backgroundColor: "var(--color-sidebar-bg)" }}
    >
      <div>
        {/* Logo */}
        <div className="p-6">
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--color-sidebar-text)" }}
          >
            ERP CRM
          </h2>

          <p
            className="mt-2 text-sm"
            style={{ color: "var(--color-sidebar-text)" }}
          >
            {user?.name}
          </p>

          <p
            className="text-xs"
            style={{ color: "var(--color-sidebar-text)" }}
          >
            {user?.role}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-4">
          {filteredMenus.map((menu) => (
            <NavLink
              key={menu.name}
              to={menu.path}
              end={menu.path === "/"}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 font-medium transition-all duration-200 ${
                  isActive
                    ? "shadow-sm"
                    : "bg-transparent hover:bg-sidebar-hover"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      backgroundColor: "var(--color-sidebar-active)",
                      color: "var(--color-sidebar-active-text)",
                    }
                  : {
                      color: "var(--color-sidebar-text)",
                    }
              }
            >
              {menu.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 bg-red-500">
        <button
          onClick={handleLogout}
          className="w-full rounded-lg px-4 py-3 font-medium"
          style={{
            backgroundColor: "var(--color-danger)",
            color: "white",
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}