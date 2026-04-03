import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 2000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {toast && (
                <div className="fixed bottom-5 right-5 bg-indigo-500 text-white px-4 py-2 rounded shadow-lg">
                    {toast}
                </div>
            )}
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);