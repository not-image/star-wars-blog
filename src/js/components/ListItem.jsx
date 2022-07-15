import { Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Context } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ListItem = ({ eachObj, onLinkClick }) => {
  let context = useContext(Context);
  let navigate = useNavigate();

  const handleClick = () => {
    //context.actions.setLoadingScreen(true);
    setTimeout(() => {
      navigate(`/${eachObj.type}/${eachObj.uid}`);
      //context.actions.setLoadingScreen(false);
    }, 0);
  };

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
      alignItems="center"
    >
      <Stack flexDirection="column">
        <Stack>
          <Typography
            onClick={() => {
              handleClick();
              onLinkClick();
            }}
            sx={{ cursor: "pointer" }}
          >
            {eachObj.name}
          </Typography>
        </Stack>
        <Stack>
          <Typography
            variant="caption"
            textTransform="uppercase"
            fontWeight="800"
          >
            {eachObj.type}
          </Typography>
        </Stack>
      </Stack>
      <Stack flexDirection="column">
        <DeleteIcon
          sx={{ color: "black", cursor: "pointer" }}
          onClick={() => context.actions.deleteFromList(eachObj.id)}
        />
      </Stack>
    </Stack>
  );
};

ListItem.propTypes = {
  eachObj: PropTypes.object,
  onLinkClick: PropTypes.func,
};

export default ListItem;
