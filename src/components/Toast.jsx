import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * Toast Notification Component
 * Beautiful animated toast messages
 */

const ToastContext = createContext();

// Toast types with their styling
const toastStyles = {
    success: {
        bg: 'bg-green-500',
        icon: '✓',
        iconBg: 'bg-green-600',
    },
    error: {
        bg: 'bg-red-500',
        icon: '✕',
        iconBg: 'bg-red-600',
    },
    warning: {
        bg: 'bg-yellow-500',
        icon: '⚠',
        iconBg: 'bg-yellow-600',
    },
    info: {
        bg: 'bg-blue-500',
        icon: 'ℹ',
        iconBg: 'bg-blue-600',
    },
};

// Individual Toast Component
const Toast = ({ toast, onClose }) => {
    const style = toastStyles[toast.type] || toastStyles.info;

    return (
        <div
            className={`${style.bg} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-[400px] animate-slide-in`}
            style={{
                animation: 'slideIn 0.3s ease-out',
            }}
        >
            <span
                className={`${style.iconBg} w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold`}
            >
                {style.icon}
            </span>
            <span className="flex-1 font-medium">{toast.message}</span>
            <button
                onClick={() => onClose(toast.id)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
                ✕
            </button>
        </div>
    );
};

// Toast Container
const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 print:hidden">
            <style>
                {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slideOut {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(100%);
              opacity: 0;
            }
          }
        `}
            </style>
            {toasts.map((toast) => (
                <Toast key={toast.id} toast={toast} onClose={removeToast} />
            ))}
        </div>
    );
};

// Toast Provider
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove after duration
        setTimeout(() => {
            removeToast(id);
        }, duration);

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    // Convenience methods
    const toast = {
        success: (message, duration) => addToast(message, 'success', duration),
        error: (message, duration) => addToast(message, 'error', duration),
        warning: (message, duration) => addToast(message, 'warning', duration),
        info: (message, duration) => addToast(message, 'info', duration),
    };

    return (
        <ToastContext.Provider value={{ toast, addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

// Hook to use toast
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export default ToastProvider;
