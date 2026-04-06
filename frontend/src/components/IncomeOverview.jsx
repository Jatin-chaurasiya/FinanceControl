import { Plus } from "lucide-react";
import { useEffect,useState } from "react";
import { prepareIncomeLineChartData } from "../Util/util.js";
import CustomLineChart from "./CustomLineChart.jsx";


const IncomeOverview = ({ transactions,onAddIncome}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(()=> {
    const data = prepareIncomeLineChartData(transactions);

    setChartData(data);
   
    return () => {
      // Cleanup if necessary
    }
  }, [transactions]); 

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0 5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
        <button className="cursor-pointer add-btn flex items-center gap-2 px-3 py-1.5 
             bg-green-100 text-green-700 font-medium 
             rounded-md hover:bg-green-200 transition" onClick={onAddIncome} >
          <Plus size={15} className="text-lg"/> Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};
export default IncomeOverview;
