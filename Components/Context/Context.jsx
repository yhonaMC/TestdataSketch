import React, { useContext, createContext, useState } from "react";

//Context
export const AppContext = createContext(null);

//Provider
export const AppContextProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);
  const [flag, setFlag] = useState(null);
  const [dataCards, setDataCards] = useState([]);

  function majorToMinor() {
    const orderPeople = dataCards.sort((a, b) => {
      if (a.age > b.age) return -1;
      if (a.age < b.age) return 1;
      return 0;
    });
    setDataCards(orderPeople);
    setFlag(true);
  }

  function minorToMajor() {
    const orderPeople2 = dataCards.sort((a, b) => {
      if (a.age < b.age) return -1;
      if (a.age > b.age) return 1;
      return 0;
    });
    setDataCards(orderPeople2);
    setFlag(false);
  }

  const values = {
    update,
    setUpdate,
    setDataCards,
    dataCards,
    flag,
    setFlag,
    majorToMinor,
    minorToMajor,
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
