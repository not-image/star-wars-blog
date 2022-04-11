import React, { useContext } from "react";
import Row from "../components/Row.jsx";
import { Context } from "../context/appContext";

export const Home = () => {
  const { store } = useContext(Context);
  const categories = [
    {
      list: store.people,
      type: "characters",
    },
    {
      list: store.planets,
      type: "planets",
    },
    {
      list: store.vehicles,
      type: "vehicles",
    },
  ];

  return (
    <div className="home">
      {categories.map((each, i) => {
        return <Row key={each.type} {...each} />;
      })}
    </div>
  );
};
