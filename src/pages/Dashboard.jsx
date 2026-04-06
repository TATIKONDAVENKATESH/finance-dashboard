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

  // 🔹 Delete state
  const [deleteId, setDeleteId] = useState(null);

  // 🔹 Add click
  const handleAddClick = () => {
    setEditingTx(null);
    setShowModal(true);
  };

  // 🔹 Confirm delete
  const handleConfirmDelete = () => {
    if (deleteId === null) return;

    deleteTransaction(deleteId);
    showToast("Deleted successfully ❌");

    setDeleteId(null);
    setEditingTx(null);
  };

  return (
    <div>

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
        onAddClick={handleAddClick}
        onDelete={(id) => setDeleteId(id)}
        onEdit={(tx) => {
          setEditingTx(tx);
          setShowModal(true);
        }}
      />

      {/* 🔹 Insights */}
      <Insights data={transactions} />

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

      {/* 🔹 Confirm Delete */}
      {deleteId !== null && (
        <ConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}