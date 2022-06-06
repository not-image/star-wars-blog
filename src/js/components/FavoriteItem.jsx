import { Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Context } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const FavoriteItem = ({ eachObj, index }) => {
  let context = useContext(Context);
  let navigate = useNavigate();

  const handleClick = () => {
    //context.actions.setLoadingScreen(true);
    setTimeout(() => {
      navigate(`/${eachObj.type}/${eachObj.uid}`);
      //context.actions.setLoadingScreen(false);
    }, 150);
  };

  return (
    <Stack flexDirection="row" width="100%" alignItems="center" sx={{paddingBottom: "5px"}}>
      <Stack flexDirection="column">
        <Stack>
          <Typography
            variant={"h6"}
            onClick={handleClick}
            sx={{ cursor: "pointer" }}
          >
            <b>{index + 1}. </b> {eachObj.name}
          </Typography>
        </Stack>
      </Stack>
      <Stack flexDirection="column">
        <Typography
          variant={"body1"}
          sx={{ color: "red", cursor: "pointer", paddingLeft: "10px" }}
          onClick={() => context.actions.deleteFromList(eachObj.id)}
        >
          Remove
        </Typography>
      </Stack>
    </Stack>
  );
};

FavoriteItem.propTypes = {
  eachObj: PropTypes.object,
  onLinkClick: PropTypes.func,
};

export default FavoriteItem;
