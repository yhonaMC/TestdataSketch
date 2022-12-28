import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Cards/Card";
import useAppContext from "../Components/Context/Context";
const HomePage = () => {
  const { setDataCards, dataCards, flag } = useAppContext();

  const apiFetchPeople = async () => {
    const { data } = await axios.get(`http://localhost:3001/people`);
    const order = data.sort((a, b) => {
      if (a.age < b.age) return -1;
      if (a.age > b.age) return 1;
      return 0;
    });
    setDataCards(order);
  };

  useEffect(() => {
    if (flag === null) {
      apiFetchPeople();
    }
  }, [flag]);

  return (
    <>
      <div className="container-cards">
        <Card dataCards={dataCards} />
      </div>
    </>
  );
};

export default HomePage;
