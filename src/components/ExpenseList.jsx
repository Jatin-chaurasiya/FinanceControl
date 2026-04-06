import { useState } from "react";
import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import toast from "react-hot-toast";

const ExpenseList = ({
  transactions,
  onDelete,
  onEdit,
  onDownload,
  onEmail,
}) => {
  const [loading, setLoading] = useState(false);
  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload();
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download expense data");
    } finally {
      setLoading(false);
    }
  };
  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } catch (error) {
      console.error("Email failed:", error);
      toast.error("Failed to email expense data");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="card p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Expense Sources</h5>
        <div className="flex items-center justify-end gap-2">
          <button
            disabled={loading}
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
            onClick={handleEmail}
          >
            {loading ? (
              <>
                <LoaderCircle size={15} className="h-4 w-4 animate-spin" />
                Emailing...
              </>
            ) : (
              <>
                <Mail size={15} className="text-base" />
                Email
              </>
            )}
          </button>
          <button
            disabled={loading}
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 bg-green-400 text-white text-sm rounded-md hover:bg-green-500 transition"
            onClick={handleDownload}
          >
            {loading ? (
              <>
                <LoaderCircle size={15} className="h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={15} className="text-base" />
                Download
              </>
            )}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* display Expense data */}
        {transactions.map((expense) => (
          <TransactionInfoCard
            key={expense.id}
            title={expense.name}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="Expense"
            onDelete={() => onDelete(expense.id)}
            onEdit={() => onEdit(expense)}
          />
        ))}
      </div>
    </div>
  );
};
export default ExpenseList;
