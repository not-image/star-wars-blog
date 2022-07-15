import * as React from "react";
import { useContext, useState } from "react";
import { Context } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, TextField } from "@mui/material";

const SearchBar = ({ type }) => {
  const [searchValue, setSearchValue] = useState("");

  let navigate = useNavigate();
  let context = useContext(Context);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Stack sx={{ position: "relative", marginTop: "-20px", width: "250px" }}>
      <TextField
        id="outlined-basic"
        value={searchValue}
        onChange={handleChange}
        label="Search"
        variant="standard"
      />
      {searchValue != "" && (
        <div className="search-list">
          {context.store[type]
            .filter((eachObj) =>
              searchValue === ""
                ? eachObj
                : eachObj.name.toLowerCase().includes(searchValue.toLowerCase())
                ? eachObj
                : ""
            )
            .map((eachObj) => {
              return (
                <Typography
                  variant="h7"
                  key={eachObj.name}
                  component="div"
                  onClick={() => {
                    //context.actions.setLoadingScreen(true);
                    setTimeout(() => {
                      navigate(`/${type}/${eachObj.uid}`);
                      //context.actions.setLoadingScreen(false);
                    }, 0);
                  }}
                  sx={{
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: "8px 10px",
                    ":hover": {
                      backgroundColor: "#f2f2f2",
                    },
                  }}
                >
                  {eachObj.name}
                </Typography>
              );
            })}
        </div>
      )}
    </Stack>
  );
};

export default SearchBar;
