import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useStorage<S>(key: string, initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState<S>(initialState);

  useEffect(() => {
    let storedValue: any = window.localStorage.getItem(key);
    storedValue = storedValue ? JSON.parse(storedValue) : initialState;
    setValue(storedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleValueChanged = (newValue: any) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, handleValueChanged];
};
