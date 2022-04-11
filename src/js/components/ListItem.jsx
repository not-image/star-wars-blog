import { Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Context } from "../context/appContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ListItem = ({ eachObj, onLinkClick }) => {
  let context = useContext(Context);

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
      alignItems="center"
    >
      <Stack flexDirection="column">
        <Stack>
          <Link to={`/${eachObj.type}/${eachObj.uid}`} onClick={onLinkClick}>
            <Typography>{eachObj.name}</Typography>
          </Link>
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
