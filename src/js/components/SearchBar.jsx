import * as React from "react";
import { useContext, useState } from "react";
import { Context } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, TextField } from "@mui/material";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  let navigate = useNavigate();
  let context = useContext(Context);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Stack sx={{ position: "relative", marginTop: "-20px", width: "211px" }}>
      <TextField
        id="outlined-basic"
        value={searchValue}
        onChange={handleChange}
        label="Search"
        variant="standard"
      />
      {searchValue != "" && (
        <div className="search-list">
          {context.store.planets
            .filter((eachObj) =>
              searchValue === ""
                ? eachObj
                : eachObj.properties.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                ? eachObj
                : ""
            )
            .map((eachObj) => {
              return (
                <Typography
                  variant="h7"
                  key={eachObj.properties.name}
                  component="div"
                  onClick={() => navigate(`/planets/${eachObj.uid}`)}
                  sx={{
                    cursor: "pointer",
                    padding: "5px 10px",
                    ":hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                >
                  {eachObj.properties.name}
                </Typography>
              );
            })}
        </div>
      )}
    </Stack>
  );
};

export default SearchBar;
