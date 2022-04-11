import React, { useCallback } from "react";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import ItemCard from "./ItemCard.jsx";

const RelatedItems = ({ store, currentItem, currentType }) => {
  let newType = "";
  if (currentType === "characters") {
    newType = "people";
  } else {
    newType = currentType;
  }

  let tempCollection = store[newType];
  let currentCollection = tempCollection.filter((each) => {
    return each != currentItem;
  });

  const createNewCollection = () => {
    let newCollection = [];

    for (let i = 0; newCollection.length < 4; i++) {
      if (newCollection.length != 0) {
        let randomIndex = Math.floor(Math.random() * currentCollection.length);
        let randomItem = currentCollection[randomIndex];
        let exists = newCollection.find((ele) => {
          return ele === randomItem;
        });
        if (exists) {
          createNewCollection();
        } else {
          newCollection.push(randomItem);
        }
      } else {
        let randomIndex = Math.floor(Math.random() * currentCollection.length);
        let randomItem = currentCollection[randomIndex];
        newCollection.push(randomItem);
      }
    }
    return newCollection;
  };

  const createdCollection = useCallback(createNewCollection(), [currentItem]);

  return (
    <Stack
      flexDirection="row"
      flexWrap="nowrap"
      sx={{ overflowX: "scroll", paddingBottom: "20px;", marginTop: "50px" }}
    >
      {createdCollection.map((each) => {
        return (
          <ItemCard key={each.properties.name} item={each} type={currentType} />
        );
      })}
    </Stack>
  );
};

RelatedItems.propTypes = {
  store: PropTypes.object,
  currentItem: PropTypes.object,
  currentType: PropTypes.string,
};

export default RelatedItems;
