import * as React from 'react';
import { ToastComponent } from '~/components/ui/toast';

type ToastProps = {
  title?: string;
  description?: string;
};

type ToastProviderProps = {
  children: React.ReactNode;
};

type UseToastReturnType = {
  showToast: (props: ToastProps) => void;
  hideToast: () => void;
};

const ToastContext = React.createContext(null);

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastProps, setToastProps] = React.useState({
    open: false,
    title: '',
    description: '',
  });

  const showToast = ({ title, description }: ToastProps) => {
    setToastProps({ open: true, title: title ?? '', description: description ?? '' });
  };

  const hideToast = () => {
    setToastProps({ ...toastProps, open: false });
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast } as any}>
      {children}
      <ToastComponent {...toastProps} setOpen={hideToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): UseToastReturnType => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
