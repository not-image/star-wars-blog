import { Stack, Typography } from "@mui/material";
import React from "react";
import ItemCard from "./ItemCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import PropTypes from "prop-types";

const Row = ({ list, type }) => {
  return (
    <Stack marginTop="50px">
      <Stack flexDirection="row" justifyContent="space-between">
        <Stack>
          <Typography
            variant="h6"
            sx={{
              textTransform: "uppercase",
              color: "rgb(25, 25, 25)",
              fontWeight: "700",
            }}
          >
            {type}
          </Typography>
        </Stack>
        <Stack>
          <SearchBar type={type} />
        </Stack>
      </Stack>
      <Stack
        sx={{ overflowX: "scroll", paddingBottom: "20px;" }}
        flexDirection="row"
        flexWrap="nowrap"
      >
        {list.map((each, id) => {
          return <ItemCard key={id} item={each} type={type} />;
        })}
      </Stack>
    </Stack>
  );
};

Row.propTypes = {
  list: PropTypes.array,
  type: PropTypes.string,
};

export default Row;
