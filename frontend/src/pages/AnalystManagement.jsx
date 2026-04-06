import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import { toast } from "react-hot-toast";
import { Ban, CheckCircle, User } from "lucide-react";

const AnalystManagement = () => {
  useUser();
  const [analysts, setAnalysts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnalysts = async () => {
    setLoading(true);
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ANALYSTS);
      setAnalysts(res.data);
    } catch {
      toast.error("Failed to fetch analysts");
    } finally {
      setLoading(false);
    }
  };

  const handleBan = async (id) => {
    try {
      await axiosConfig.put(API_ENDPOINTS.BAN_ANALYST(id));
      toast.success("Analyst banned");
      fetchAnalysts();
    } catch {
      toast.error("Failed to ban analyst");
    }
  };

  const handleUnban = async (id) => {
    try {
      await axiosConfig.put(API_ENDPOINTS.UNBAN_ANALYST(id));
      toast.success("Analyst unbanned");
      fetchAnalysts();
    } catch {
      toast.error("Failed to unban analyst");
    }
  };

  useEffect(() => {
    fetchAnalysts();
  }, []);

  return (
    <Dashboard activeMenu="Analysts">
      <div className="my-5 mx-auto">
        <h2 className="text-2xl font-semibold mb-5">Analyst Management</h2>

        {loading && <p className="text-gray-500">Loading...</p>}

        <div className="grid grid-cols-1 gap-4">
          {analysts.map((analyst) => (
            <div
              key={analyst.id}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              {/* Left — Profile info */}
              <div className="flex items-center gap-4">
                {analyst.profileImageUrl ? (
                  <img
                    src={analyst.profileImageUrl}
                    alt={analyst.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-800">{analyst.fullName}</p>
                  <p className="text-sm text-gray-500">{analyst.email}</p>
                </div>
              </div>

              {/* Right — Status + Buttons */}
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  !analyst.banned
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {!analyst.banned ? "Active" : "Banned"}
                </span>

                <button
                  onClick={() => handleBan(analyst.id)}
                  disabled={analyst.banned}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition text-sm font-medium ${
                    analyst.banned
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  <Ban size={15} /> Ban
                </button>

                <button
                  onClick={() => handleUnban(analyst.id)}
                  disabled={!analyst.banned}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition text-sm font-medium ${
                    !analyst.banned
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  <CheckCircle size={15} /> Unban
                </button>
              </div>
            </div>
          ))}

          {!loading && analysts.length === 0 && (
            <p className="text-gray-500">No analysts found</p>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default AnalystManagement;