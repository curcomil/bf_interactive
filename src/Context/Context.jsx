import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [context, setContext] = useState("menu");

  return (
    <AppContext.Provider value={{ context, setContext }}>
      {children}
    </AppContext.Provider>
  );
}
