import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Cards/Card";
const HomePage = () => {
  const [dataCards, setDataCards] = useState([]);
  // http://localhost:3001/people
  //http://localhost:3001/tasks

  const apiFetchPeople = async () => {
    const { data } = await axios.get(`http://localhost:3001/people`);
    setDataCards(data);
  };

  useEffect(() => {
    apiFetchPeople();
  }, []);

  return (
    <>
      <div className="aling-card">
        <Card dataPeople={dataCards} />
      </div>
    </>
  );
};

export default HomePage;
