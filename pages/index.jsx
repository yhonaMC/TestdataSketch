import React, { useCallback, useEffect } from "react";
import Card from "../Components/Cards/Card";
import useAppContext from "../Components/Context/Context";
import { getDataApi } from "./Peticions/Peticions";
const HomePage = () => {
  const { setDataCards, dataCards, flag } = useAppContext();

  const apiFetchPeople = useCallback(
    async (abortePeticion) => {
      try {
        const { data } = await getDataApi(
          `http://localhost:3001/people`,
          abortePeticion
        );
        const order = data.sort((a, b) => {
          if (a.age < b.age) return -1;
          if (a.age > b.age) return 1;
          return 0;
        });
        setDataCards(order);
      } catch (error) {
        console.log(error);
      }
    },
    [setDataCards]
  );

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if (flag === null) {
      apiFetchPeople(signal);
    }

    return () => controller.abort();
  }, [flag, apiFetchPeople]);

  return (
    <>
      <div className="container-cards">
        <Card dataCards={dataCards} />
      </div>
    </>
  );
};

export default HomePage;
