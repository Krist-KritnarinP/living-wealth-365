import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}

      {/* Floating daisyUI Toast Container */}
      {toasts.length > 0 && (
        <aside aria-label="Notifications" className="toast toast-top toast-end z-50 p-4 space-y-2 pointer-events-none">
          {toasts.map((toast) => {
            let alertClass = 'alert-success text-success-content';
            let Icon = CheckCircle2;

            if (toast.type === 'error') {
              alertClass = 'alert-error text-error-content';
              Icon = AlertCircle;
            } else if (toast.type === 'info') {
              alertClass = 'alert-info text-info-content';
              Icon = Info;
            } else if (toast.type === 'warning') {
              alertClass = 'alert-warning text-warning-content';
              Icon = AlertTriangle;
            }

            return (
              <div
                key={toast.id}
                role="status"
                className={`alert ${alertClass} shadow-xl rounded-2xl flex items-center justify-between gap-3 pointer-events-auto border border-base-100/20 backdrop-blur-md transition-all duration-300 animate-fadeIn`}
              >
                <div className="flex items-center gap-2.5 text-sm font-bold">
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{toast.message}</span>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="btn btn-ghost btn-circle btn-xs hover:bg-black/10"
                  aria-label="Close notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </aside>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
