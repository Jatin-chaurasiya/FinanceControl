import { LoaderCircle } from "lucide-react";
import EmojiPickerPop from "./EmojiPickupPop";
import Input from "./Input";
import { useEffect, useState } from "react";

const AddIncomeForm = ({ onAddIncome, categories, isEditing = false, initialData }) => {
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
    id: initialData?.id || undefined,
  });

  const [loading, setLoading] = useState(false);

  // 🔥 Prefill values ONLY when editing
  useEffect(() => {
    if (isEditing && initialData) {
      setIncome({
        name: initialData.name || "",
        amount: initialData.amount || "",
        date: initialData.date?.split("T")[0] || "",
        icon: initialData.icon || "",
        categoryId: initialData.categoryId || "",
        id: initialData.id, // important for update API
      });
    }
  }, [isEditing, initialData]);

  // 🔥 Universal submit handler for both Add + Edit
  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await onAddIncome(income);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const handleInputChange = (key, value) => {
    setIncome((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <EmojiPickerPop
        icon={income.icon}
        onSelect={(selectedIcon) => handleInputChange("icon", selectedIcon)}
      />

      <Input
        value={income.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        label="Income Name"
        placeholder="Enter income source name"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={(e) => handleInputChange("amount", e.target.value)}
        label="Amount"
        placeholder="Enter amount e.g. 500"
        type="number"
      />

      <Input
        value={income.date}
        onChange={(e) => handleInputChange("date", e.target.value)}
        label="Date"
        placeholder="Select date"
        type="date"
      />

      <Input
        value={income.categoryId}
        onChange={(e) => handleInputChange("categoryId", Number(e.target.value))}
        isSelect={true}
        options={categoryOptions}
        label="Category"
      />

      <div className="flex justify-end mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          onClick={handleSubmit}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {isEditing ? "Updating..." : "Adding..."}
            </div>
          ) : (
            <>{isEditing ? "Update Income" : "Add Income"}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
