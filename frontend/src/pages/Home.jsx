import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import InfoCard from "../components/InfoCard";
import { WalletCards, Wallet, Coins } from "lucide-react";
import { addThousandsSeparator } from "../Util/util.js";
import { toast } from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverView from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";
import { useRole } from "../hooks/useRole";

const Home = () => {
  useUser();
  const navigate = useNavigate();
  const { role } = useRole();

  const [dashboardData, setdashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      let url = API_ENDPOINTS.DASHBOARD_DATA;

      // ✅ ADMIN ke liye different call (important)
      if (role === "ADMIN") {
        url = `${API_ENDPOINTS.DASHBOARD_DATA}?type=admin`;
      }

      const response = await axiosConfig.get(url);

      console.log("Dashboard API:", response.data);

      setdashboardData(response.data || {});
    } catch (error) {
      console.error("Dashboard error:", error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [role]); // ✅ role change pe re-fetch

  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<WalletCards />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
              color="bg-purple-800"
            />
            <InfoCard
              icon={<Wallet />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
              color="bg-green-800"
            />
            <InfoCard
              icon={<Coins />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
              color="bg-red-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions || []}
              onMore={() => navigate("/expense")}
            />

            <FinanceOverView
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />

            <Transactions
              transactions={dashboardData?.recent5Expenses || []}
              onMore={() => navigate("/expense")}
              type="expense"
              title="Recent Expenses"
            />

            <Transactions
              transactions={dashboardData?.recent5Incomes || []}
              onMore={() => navigate("/income")}
              type="income"
              title="Recent Incomes"
            />
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Home;