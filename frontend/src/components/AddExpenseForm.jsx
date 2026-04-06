import { useEffect, useState } from "react";
import EmojiPickerPop from "./EmojiPickupPop";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";


const AddExpenseForm = ({
  onAddExpense,
  categories,
  isEditing = false,
  initialdata,
}) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
    id: initialdata?.id || undefined,
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isEditing && initialdata) {
      setExpense({
        name: initialdata.name || "",
        amount: initialdata.amount || "",
        date: initialdata.date?.split("T")[0] || "",
        icon: initialdata.icon || "",
        categoryId: initialdata.categoryId || "",
        id: initialdata.id, 
      });
    }
  }, [isEditing, initialdata]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onAddExpense(expense);
    }
    catch (error) {
      toast.error(error.message || "Failed to add expense");
    }finally {
      setLoading(false);
    } 
  };
  const categoriesOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));
  const handleInputChange = (key, value) => {
    setExpense((prev) => ({
      ...prev,
      [key]: value,
    }));
  }
  return (
    <div>
      <EmojiPickerPop
        icon={expense.icon}
        onSelect={(selectedIcon) => handleInputChange("icon", selectedIcon)}
      />
      <Input
        value={expense.categoryId}
        onChange={(e) =>
          handleInputChange("categoryId", Number(e.target.value))}
          isSelect={true}
          options={categoriesOptions}
        label="Category"
      />
      <Input
        value={expense.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        label="Expense Name"
        placeholder="Enter expense name"
        type="text"
      />
      <Input
        value={expense.amount}
        onChange={(e) => handleInputChange("amount", e.target.value)}
        label="Amount"
        placeholder="Enter amount e.g. 500"
        type="number"
      />
      <Input
        value={expense.date}
        onChange={(e) => handleInputChange("date", e.target.value)}
        label="Date"
        placeholder="Select date"
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {loading ? <>
            <LoaderCircle size={15} className="h-4 w-4 animate-spin" />
            {isEditing ? "Updating..." : "Adding..."}
          </> : <>
            {isEditing ? "Update Expense" : "Add Expense"}
          </>}
        </button>
      </div>
    </div>
  );
};
export default AddExpenseForm;
