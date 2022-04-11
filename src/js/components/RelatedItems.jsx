import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import ItemCard from "./ItemCard.jsx";

const RelatedItems = ({ store, currentType }) => {
  const [randomNumber, setRandomNumber] = useState(0);

  let newType = "";
  if (currentType === "characters") {
    newType = "people";
  } else {
    newType = currentType;
  }

  let currentCollection = store[newType];

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 6) + 1);
  });
  console.log(randomNumber, "why does it render so many times");

  return (
    <Stack
      flexDirection="row"
      flexWrap="nowrap"
      sx={{ overflowX: "scroll", paddingBottom: "20px;", marginTop: "50px" }}
    >
      {currentCollection.slice(randomNumber, randomNumber + 4).map((each) => {
        return (
          <ItemCard key={each.properties.name} item={each} type={currentType} />
        );
      })}
    </Stack>
  );
};

RelatedItems.propTypes = {
  store: PropTypes.object,
  currentType: PropTypes.string,
};

export default RelatedItems;
