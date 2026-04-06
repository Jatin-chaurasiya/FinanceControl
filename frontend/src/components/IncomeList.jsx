import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import toast from "react-hot-toast";
import { useState } from "react";

const IncomeList = ({
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
      toast.error;
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } catch (error) {
      toast.error("Failed to email income excel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Income Sources</h5>

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
            className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition"
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
        {/* display the incomes */}
        {transactions.map((income) => (
          <TransactionInfoCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            date={
              income.date
                ? moment(income.date).format("Do MMM YYYY")
                : "No Date"
            }
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income.id)}
            onEdit={() => onEdit(income)}
          />
        ))}
      </div>
    </div>
  );
};
export default IncomeList;
