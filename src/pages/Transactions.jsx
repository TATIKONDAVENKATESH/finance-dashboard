import TransactionTable from "../components/transactions/TransactionTable";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import ConfirmModal from "../components/ui/ConfirmModal";

import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useToast } from "../context/ToastContext";

export default function Transactions() {
    const {
        role,
        transactions,
        showModal,
        setShowModal,
        editingTx,
        setEditingTx,
        addOrUpdateTransaction,
        deleteTransaction,
    } = useAppContext();

    const { showToast } = useToast();

    const [deleteId, setDeleteId] = useState(null);

    // ✅ Convert role → boolean (single source of truth)
    const isAdmin = role === "admin";

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
            {/* 🔹 Title */}
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Transactions
            </h1>

            {/* 🔹 Table */}
            <section>
                <TransactionTable
                    data={transactions}
                    role={isAdmin}   // ✅ FIXED HERE
                    onAddClick={handleAddClick}
                    onDelete={(id) => setDeleteId(id)}
                    onEdit={(tx) => {
                        setEditingTx(tx);
                        setShowModal(true);
                    }}
                />
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