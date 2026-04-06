import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../Util/util.js";
import { Plus } from "lucide-react";
import CustomLineChart from "./CustomLineChart.jsx";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    const data = prepareIncomeLineChartData(transactions);
    setChartData(data);
    return () => {};
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0 5">
            Monitor your spending patterns and gain insights into your expenses.
          </p>
        </div>
        <button
          className="cursor-pointer add-btn flex items-center gap-2 px-3 py-1.5 
             bg-green-100 text-green-700 font-medium 
             rounded-md hover:bg-green-200 transition"
          onClick={onAddExpense}
        >
          <Plus size={15} className="text-lg" /> Add Expense
        </button>
      </div>
      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};
export default ExpenseOverview;
