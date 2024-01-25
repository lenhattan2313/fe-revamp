import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

type Severity = 'success' | 'error' | 'warning' | 'info';

interface SnackbarData {
  id: number;
  open: boolean;
  message: string;
  severity: Severity;
}

interface AlertContextProps {
  showSnackbar: (message: string, severity?: Severity) => void;
  closeSnackbar: (id: number) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
type Props = {
  children: ReactNode;
};
export const AlertProvider: FC<Props> = ({ children }) => {
  const [snackbarList, setSnackbarList] = useState<SnackbarData[]>([]);

  const showSnackbar = (message: string, severity: Severity = 'success') => {
    const id = new Date().getTime();
    setSnackbarList((prevState) => [
      ...prevState,
      { id, open: true, message, severity },
    ]);
  };

  const closeSnackbar = (id: number) => {
    setSnackbarList((prevState) =>
      prevState.filter((snackbar) => snackbar.id !== id),
    );
  };

  return (
    <AlertContext.Provider value={{ showSnackbar, closeSnackbar }}>
      {children}
      {snackbarList.map((snackbar) => (
        <Snackbar
          key={snackbar.id}
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => closeSnackbar(snackbar.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <MuiAlert
            onClose={() => closeSnackbar(snackbar.id)}
            severity={snackbar.severity}
          >
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      ))}
    </AlertContext.Provider>
  );
};
