import React, { useContext, createContext, useState } from "react";

//Context
export const AppContext = createContext(null);

//Provider
export const AppContextProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);
  const [flag, setFlag] = useState(null);
  const [dataCards, setDataCards] = useState([]);

  const values = {
    update,
    setUpdate,
    setDataCards,
    dataCards,
    flag,
    setFlag,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

//
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    console.error("Error deploying App Context!!!");
  }

  return context;
}

export default useAppContext;
