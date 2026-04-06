import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import Modal from "../components/Modal";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeList from "../components/IncomeList";
import IncomeOverview from "../components/IncomeOverview";
import useIncome from "../hooks/useIncome";
import { toast } from "react-hot-toast";

const Income = () => {
  useUser();
  const { state: { incomeData, categories, analysts }, addIncome, updateIncome, deleteIncome, downloadExcel, emailExcel } = useIncome();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedIncome, setSelectedIncome] = useState(null);

  const handleAddIncome = async (data, targetUserId) => {
    await addIncome(data, targetUserId);
    setOpenAdd(false);
  };

  const handleUpdateIncome = async (data) => {
    await updateIncome(data.id, data);
    setOpenEdit(false);
    setSelectedIncome(null);
  };

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAdd(true)} />
          <IncomeList transactions={incomeData} onDelete={(id) => setDeleteId(id)}
            onEdit={(inc) => { setSelectedIncome(inc); setOpenEdit(true); }}
            onDownload={downloadExcel} onEmail={emailExcel} />

          <Modal isOpen={openAdd} onClose={() => setOpenAdd(false)} title="Add Income">
            <AddIncomeForm categories={categories} analysts={analysts} onAddIncome={handleAddIncome} />
          </Modal>

          <Modal isOpen={openEdit} onClose={() => { setOpenEdit(false); setSelectedIncome(null); }} title="Edit Income">
            <AddIncomeForm isEditing initialData={selectedIncome} categories={categories} analysts={analysts} onAddIncome={handleUpdateIncome} />
          </Modal>

          <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Income">
            <DeleteAlert content="Are you sure you want to delete?"
              onDelete={async () => { await deleteIncome(deleteId); setDeleteId(null); toast.success("Income deleted"); }}
              onCancel={() => setDeleteId(null)} />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;