import * as React from "react";
import { Stack, CardMedia, Typography, Card } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/appContext";
import PropTypes from "prop-types";

const ItemCard = ({ item, type }) => {
  let context = useContext(Context);
  let navigate = useNavigate();
  let params = useParams();

  let imageSource = "";
  if (item.id != "11") {
    imageSource = `https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`;
  } else {
    imageSource = `https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_(fictional_desert_planet).jpg`;
  }

  const handleClick = () => {
    //context.actions.setLoadingScreen(true);
    setTimeout(() => {
      navigate(`/${type}/${item.uid}`);
      //context.actions.setLoadingScreen(false);
    }, 0);
  };

  return (
    <Card
      className={!params.type ? "md-width item-card" : "sm-width item-card"}
      sx={{
        boxShadow: "0 0 5px 0px rgba(25, 25, 25, 0.1)",
        borderRadius: "10px",
        margin: "10px",
        border: "1px solid rgb(220, 220, 220)",
      }}
    >
      <CardMedia
        component="img"
        onClick={handleClick}
        height="200"
        image={imageSource}
        sx={{ filter: "brightness(70%)", cursor: "pointer" }}
      />

      <Stack
        className={!params.type ? "min-height-150" : "min-height-70"}
        flexDirection="column"
        justifyContent="space-between"
        padding="15px 20px"
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography
            onClick={handleClick}
            className="hover-text"
            sx={{
              textTransform: "uppercase",
              fontWeight: 800,
              color: "black",
              cursor: "pointer",
            }}
            variant="h7"
            component="p"
          >
            {item.name}
          </Typography>

          {!context.store.favorites.find(
            (eachObj) => eachObj.id === item.id
          ) ? (
            <FavoriteBorderIcon
              onClick={() => context.actions.toggleFavorites(item, type)}
              sx={{ color: "black", cursor: "pointer" }}
            />
          ) : (
            <FavoriteIcon
              onClick={() => context.actions.toggleFavorites(item, type)}
              sx={{ color: "black", cursor: "pointer" }}
            />
          )}
        </Stack>
        {!params.type && (
          <Stack>
            <Typography
              sx={{ fontWeight: 500, color: "black" }}
              variant="body1"
              component="div"
            >
              {item.height && (
                <div>
                  <b>Height: </b>
                  {item.height}
                </div>
              )}
              {item.population && (
                <div>
                  <b>Population: </b>
                  {item.population}
                </div>
              )}
            </Typography>
            <Typography
              sx={{ fontWeight: 500, color: "black" }}
              variant="body1"
              component="div"
            >
              {item.gender && (
                <div>
                  <b>Gender: </b>
                  {item.gender}
                </div>
              )}
              {item.terrain && (
                <div>
                  <b>Terrain: </b>
                  {item.terrain}
                </div>
              )}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

ItemCard.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
};

export default ItemCard;
