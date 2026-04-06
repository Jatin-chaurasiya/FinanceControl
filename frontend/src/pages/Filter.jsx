import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { Search } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "../components/TransactionInfoCard";
import useFilter from "../hooks/useFilter";
import { useRole } from "../hooks/useRole.js";

const Filter = () => {
  useUser();
  const { isAdmin } = useRole();
  const { state, setFilterField, applyFilters } = useFilter();
  const { type, startDate, endDate, keyword, sortField, sortOrder, transactions, loading, analysts, targetUserId } = state;

  return (
    <Dashboard activeMenu="Filters">
      <div className="my-5 mx-auto">
        <div className="flex justify-between text-center mb-4">
          <h1 className="text-2xl font-semibold">Filters Transaction</h1>
        </div>

        <div className="card p-4 mb-4">
          <h5 className="text-lg font-semibold mb-3">Select the Filters</h5>
          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4"
            onSubmit={(e) => { e.preventDefault(); applyFilters(); }}>

            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select value={type} onChange={(e) => setFilterField("type", e.target.value)} className="w-full border rounded px-3 py-2">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setFilterField("startDate", e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input type="date" value={endDate} onChange={(e) => setFilterField("endDate", e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sort Field</label>
              <select value={sortField} onChange={(e) => setFilterField("sortField", e.target.value)} className="w-full border rounded px-3 py-2">
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sort Order</label>
              <select value={sortOrder} onChange={(e) => setFilterField("sortOrder", e.target.value)} className="w-full border rounded px-3 py-2">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="sm:col-span-1 md:col-span-1 flex items-end">
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Search</label>
                <input type="text" placeholder="Search..." value={keyword}
                  onChange={(e) => setFilterField("keyword", e.target.value)} className="w-full border rounded px-3 py-2" />
              </div>
              <button type="submit" className="ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-700 text-white rounded flex items-center">
                <Search size={20} />
              </button>
            </div>

            {isAdmin && analysts?.length > 0 && (
              <div className="col-span-full">
                <label className="block text-sm font-medium mb-1">Filter by Analyst</label>
                <select value={targetUserId || ""}
                  onChange={(e) => setFilterField("targetUserId", e.target.value ? Number(e.target.value) : null)}
                  className="w-full sm:w-72 border rounded px-3 py-2">
                  <option value="">All Analysts</option>
                  {analysts.map((analyst) => (
                    <option key={analyst.id} value={analyst.id}>
                      {analyst.fullName} ({analyst.email})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form>
        </div>

        <div className="card p-4">
          <h5 className="text-lg font-semibold mb-3">Transactions</h5>
          {!loading && transactions.length === 0 && (
            <p className="text-gray-500">Select the filters and click search to filter transactions</p>
          )}
          {loading && <p className="text-gray-500">Loading...</p>}
          {transactions.map((transaction) => (
            <TransactionInfoCard key={transaction.id} title={transaction.name} icon={transaction.icon}
              date={moment(transaction.date).format("Do MMM YYYY")} amount={transaction.amount} type={type} hideDeleteBtn />
          ))}
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;