import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeMenu }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // ✅ ALWAYS get fresh role
  let role = localStorage.getItem("role");

  console.log("Sidebar Role:", role);

  console.log("Menu:", SIDE_BAR_DATA);

  // ✅ normalize role
  role = role?.toUpperCase()?.replace("ROLE_", "").trim();

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-[#00ccff] p-5">
      <div className="flex flex-col items-center gap-3 mb-7">
        {user?.profileImageUrl ? (
          <img src={user.profileImageUrl} className="w-15 h-15 rounded-full" />
        ) : (
          <User className="w-20 h-20" />
        )}
        <h5>{user?.fullName || ""}</h5>
      </div>

      {/* ✅ FILTER INLINE (important fix) */}
      {SIDE_BAR_DATA.map((item, index) => {
        const role = localStorage.getItem("role");

        const normalizedRole = role
          ?.toUpperCase()
          ?.replace("ROLE_", "")
          ?.trim();

        if (!normalizedRole || !item.allowedRoles.includes(normalizedRole)) {
          return null;
        }

        return (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-4 py-3 px-6 rounded-lg mb-3 ${
              activeMenu === item.label ? "text-white bg-purple-800" : ""
            }`}
          >
            <item.icon />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;
