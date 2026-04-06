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

    // 🔹 Delete state
    const [deleteId, setDeleteId] = useState(null);

    // 🔹 Add click handler
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
        <div className="p-6 bg-[#020617] min-h-screen">

            {/* 🔹 Page Title */}
            <h1 className="text-white text-2xl font-semibold mb-6">
                Transactions
            </h1>

            {/* 🔹 Table */}
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