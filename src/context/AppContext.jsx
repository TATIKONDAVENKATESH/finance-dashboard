import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
} from "react";

import { transactionsData as initialData } from "../data/mockData";
import {
    getIncome,
    getExpense,
    getBalance,
} from "../utils/calculateStats";

const AppContext = createContext(null);

export function AppProvider({ children }) {
    // 🔹 Role
    const [role, setRole] = useState("viewer");

    // 🔹 Transactions (with persistence)
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : initialData;
    });

    // 🔹 Modal + Edit state
    const [showModal, setShowModal] = useState(false);
    const [editingTx, setEditingTx] = useState(null);

    // 🔹 Persist data
    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    // 🔹 Add / Update
    const addOrUpdateTransaction = (tx) => {
        setTransactions((prev) => {
            if (editingTx) {
                return prev.map((t) => (t.id === tx.id ? tx : t));
            }
            return [...prev, tx];
        });
        setEditingTx(null);
    };

    // 🔹 Delete
    const deleteTransaction = (id) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    // 🔹 Derived values (memoized)
    const income = useMemo(() => getIncome(transactions), [transactions]);
    const expense = useMemo(() => getExpense(transactions), [transactions]);
    const balance = useMemo(() => getBalance(transactions), [transactions]);

    // 🔹 Context value (memoized)
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

            // ✅ Derived
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
        ]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// 🔹 Custom hook (SAFE)
export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used within AppProvider");
    }

    return context;
  };