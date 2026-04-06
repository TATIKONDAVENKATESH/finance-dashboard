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

  const [deleteId, setDeleteId] = useState(null);

  const handleAddClick = () => {
    setEditingTx(null);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId === null) return;

    deleteTransaction(deleteId);
    showToast("Deleted successfully ❌");

    setDeleteId(null);
    setEditingTx(null);
  };

  return (
    <div className="space-y-6">

      {/* 🔹 Cards */}
      <section className="grid md:grid-cols-3 gap-4">
        <HeroCard balance={balance} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expenses" value={expense} />
      </section>

      {/* 🔹 Charts */}
      <section>
        <Charts data={transactions} />
      </section>

      {/* 🔹 Transactions */}
      <section>
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
      </section>

      {/* 🔹 Insights */}
      <section>
        <Insights data={transactions} />
      </section>

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