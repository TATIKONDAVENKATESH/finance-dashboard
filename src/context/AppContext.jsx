import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from "react";

import { transactionsData as initialData } from "../data/mockData";
import {
    getIncome,
    getExpense,
    getBalance,
} from "../utils/calculateStats";

const AppContext = createContext(null);

export function AppProvider({ children }) {
    // Role (persisted)
    const [role, setRole] = useState(() => {
        return localStorage.getItem("role") || "viewer";
    });

    // Transactions (safe persistence)
    const [transactions, setTransactions] = useState(() => {
        try {
            const saved = localStorage.getItem("transactions");
            return saved ? JSON.parse(saved) : initialData;
        } catch (err) {
            console.error("Failed to parse transactions:", err);
            return initialData;
        }
    });

    // Modal + Edit state
    const [showModal, setShowModal] = useState(false);
    const [editingTx, setEditingTx] = useState(null);

    // Persist transactions
    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    // Persist role
    useEffect(() => {
        localStorage.setItem("role", role);
    }, [role]);

    // Add / Update
    const addOrUpdateTransaction = useCallback((tx) => {
        setTransactions((prev) => {
            let newTx = tx;

            if (!tx.id) {
                newTx = { ...tx, id: Date.now() };
            }

            const exists = prev.some((t) => t.id === newTx.id);

            if (exists) {
                return prev.map((t) => (t.id === newTx.id ? newTx : t));
            }

            return [...prev, newTx];
        });

        setEditingTx(null);
    }, []);

    // Delete
    const deleteTransaction = useCallback((id) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    }, []);

    // Derived values
    const income = useMemo(() => getIncome(transactions), [transactions]);
    const expense = useMemo(() => getExpense(transactions), [transactions]);
    const balance = useMemo(() => getBalance(transactions), [transactions]);

    // Context value
    const value = useMemo(
        () => ({
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
        }),
        [
            role,
            transactions,
            showModal,
            editingTx,
            income,
            expense,
            balance,
            addOrUpdateTransaction,
            deleteTransaction,
        ]
    );

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

// Hook
export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used within AppProvider");
    }

    return context;
};