import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { FC, ReactNode, createContext, useState } from 'react';

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

export const AlertContext = createContext<AlertContextProps | undefined>(
  undefined,
);

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
