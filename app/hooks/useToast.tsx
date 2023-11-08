import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/atoms/toast';
import { nanoid } from 'nanoid';

type ToastType = {
  id: string;
  message: string;
};

const ToastContext = React.createContext<{
  addToast: (message: string) => void;
  removeToast: (id: string) => void;
}>({
  addToast: () => {},
  removeToast: () => {},
});

export const ToastProvider = ({ children }: any) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = (message: string) => {
    const id = nanoid();
    setToasts((toasts) => [...toasts, { id, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 z-50">
          {toasts.map((toast) => (
            <Toast key={toast.id} message={toast.message} onClose={() => removeToast(toast.id)} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => React.useContext(ToastContext);

export default useToast;
