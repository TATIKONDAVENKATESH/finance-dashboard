import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import SummaryCard from "../components/dashboard/SummaryCard";
import HeroCard from "../components/dashboard/HeroCard";
import Charts from "../components/dashboard/Charts";
import TransactionTable from "../components/transactions/TransactionTable";
import Insights from "../components/dashboard/Insights";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import ConfirmModal from "../components/ui/ConfirmModal";

import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useToast } from "../context/ToastContext";

export default function Dashboard() {
  const {
    role,
    setRole,
    transactions,
    showModal,
    setShowModal,
    editingTx,
    setEditingTx,
    addOrUpdateTransaction,
    deleteTransaction,
    income,
    expense,
    balance,
  } = useAppContext();

  const { showToast } = useToast();

  // ✅ Confirm delete state
  const [deleteId, setDeleteId] = useState(null);

  // ✅ Handle confirm delete
  const handleConfirmDelete = () => {
    deleteTransaction(deleteId);
    showToast("Deleted successfully ❌");
    setDeleteId(null);
  };

  return (
    <div className="flex bg-[#020617] min-h-screen">

      {/* 🔹 Sidebar */}
      <Sidebar />

      {/* 🔹 Main Content */}
      <div className="flex-1 p-6">
        <Topbar role={role} setRole={setRole} />

        {/* 🔹 Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <HeroCard balance={balance} />
          <SummaryCard title="Income" value={income} />
          <SummaryCard title="Expenses" value={expense} />
        </div>

        {/* 🔹 Charts */}
        <div className="mt-6">
          <Charts data={transactions} />
        </div>

        {/* 🔹 Transactions */}
        <TransactionTable
          data={transactions}
          role={role}
          onAddClick={() => setShowModal(true)}
          onDelete={(id) => setDeleteId(id)} // ✅ FIXED
          onEdit={(tx) => {
            setEditingTx(tx);
            setShowModal(true);
          }}
        />

        {/* 🔹 Insights */}
        <Insights data={transactions} />
      </div>

      {/* 🔹 Add/Edit Modal */}
      {showModal && (
        <AddTransactionModal
          onAdd={(tx) => {
            addOrUpdateTransaction(tx);
            showToast("Transaction saved ✅");
          }}
          onClose={() => {
            setShowModal(false);
            setEditingTx(null);
          }}
          existing={editingTx}
        />
      )}

      {/* 🔹 Confirm Delete Modal */}
      {deleteId && (
        <ConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}