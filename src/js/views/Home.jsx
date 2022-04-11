import { Box, CircularProgress, Typography } from "@mui/material";
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
    <>
      {store.isLoading ? (
        <Box>
          <CircularProgress
            sx={{
              color: "black",
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: "auto",
            }}
          />
        </Box>
      ) : (
        <div className="home">
          {categories.map((each, i) => {
            return <Row key={each.type} {...each} />;
          })}
        </div>
      )}
    </>
  );
};
