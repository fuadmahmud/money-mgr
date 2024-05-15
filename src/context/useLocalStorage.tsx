import { createContext, ReactNode, useContext, useState } from "react"

interface ILocalStorageContext {
  setValues: (values: string) => void;
  getValues: () => string | undefined;
}

const initialState = {
  setValues: () => ({}),
  getValues: () => ""
}

const LocalStorageContext = createContext<ILocalStorageContext>(initialState);

export const useLocalStorage = () => useContext(LocalStorageContext);

export const LocalStorageProvider = ({ children }: { children: ReactNode }) => {
  const [storageValue, setStorageValue] = useState<string>();

  const setValues = (values: string) => setStorageValue(values);

  const getValues = () => storageValue;

  return (
    <LocalStorageContext.Provider value={{ setValues, getValues }}>
      {children}
    </LocalStorageContext.Provider>
  );
}
