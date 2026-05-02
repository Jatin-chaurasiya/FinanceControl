import logo from "./logo.png";
import logo1 from "./logo1.png";
import login_bg from "./login-bg.jpg";
import landing from "./landing.png";
import google_icon from "./google_icon.avif";
import { Coins, FunnelPlus, LayoutDashboard, List, Wallet } from "lucide-react";
import { Users } from "lucide-react";

export const assets = { logo, login_bg, landing, google_icon,logo1 };

export const SIDE_BAR_DATA = [
  { id: "01", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard", allowedRoles: ["ANALYST", "ADMIN"] },
  { id: "02", label: "Category", icon: List, path: "/category", allowedRoles: ["ADMIN"] },
  { id: "03", label: "Income", icon: Wallet, path: "/income", allowedRoles: ["ANALYST", "ADMIN"] },
  { id: "04", label: "Expense", icon: Coins, path: "/expense", allowedRoles: ["ANALYST", "ADMIN"] },
  { id: "05", label: "Filters", icon: FunnelPlus, path: "/filter", allowedRoles: ["ANALYST", "ADMIN"] },
  { id: "06", label: "Analysts", icon: Users, path: "/analysts", allowedRoles: ["ADMIN"] }, // ← ADD
];