import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import ExpenseList from "../components/ExpenseList";
import ExpenseOverview from "../components/ExpenseOverview";
import AddExpenseForm from "../components/AddExpenseForm";
import Modal from "../components/Modal";
import DeleteAlert from "../components/DeleteAlert";
import useExpense from "../hooks/useExpense";

const Expense = () => {
  useUser();
  const { state: { expenseData, categories, analysts }, addExpense, updateExpense, deleteExpense, downloadExcel, emailExcel } = useExpense();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleAddExpense = async (data, targetUserId) => {
    await addExpense(data, targetUserId);
    setOpenAdd(false);
  };

  const handleUpdateExpense = async (data) => {
    await updateExpense(data.id, data);
    setOpenEdit(false);
    setSelectedExpense(null);
  };

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview transactions={expenseData} onAddExpense={() => setOpenAdd(true)} />
          <ExpenseList transactions={expenseData} onDelete={(id) => setDeleteId(id)}
            onEdit={(exp) => { setSelectedExpense(exp); setOpenEdit(true); }}
            onDownload={downloadExcel} onEmail={emailExcel} />

          <Modal isOpen={openAdd} onClose={() => setOpenAdd(false)} title="Add Expense">
            <AddExpenseForm categories={categories} analysts={analysts} onAddExpense={handleAddExpense} />
          </Modal>

          <Modal isOpen={openEdit} onClose={() => { setOpenEdit(false); setSelectedExpense(null); }} title="Edit Expense">
            <AddExpenseForm isEditing initialdata={selectedExpense} categories={categories} analysts={analysts} onAddExpense={handleUpdateExpense} />
          </Modal>

          <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Expense">
            <DeleteAlert content="Are you sure you want to delete this expense?"
              onDelete={async () => { await deleteExpense(deleteId); setDeleteId(null); }}
              onCancel={() => setDeleteId(null)} />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Expense;