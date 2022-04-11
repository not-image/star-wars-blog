import * as React from "react";
import { Stack, CardMedia, Typography, Card } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/appContext";
import PropTypes from "prop-types";

const ItemCard = ({ item, type }) => {
  let context = useContext(Context);

  let params = useParams();

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
      <Link to={`/${type}/${item.uid}`}>
        <CardMedia
          component="img"
          height="200"
          image={`https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`}
          sx={{ filter: "brightness(70%)" }}
        />
      </Link>
      <Stack
        className={!params.type ? "min-height-150" : "min-height-70"}
        flexDirection="column"
        justifyContent="space-between"
        padding="15px 20px"
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Link to={`/${type}/${item.uid}`}>
            <Typography
              className="hover-text"
              sx={{
                textTransform: "uppercase",
                fontWeight: 800,
                color: "black",
              }}
              variant="h7"
              component="p"
            >
              {item.properties.name}
            </Typography>
          </Link>
          {!context.store.favorites.find(
            (eachObj) => eachObj.id === item._id
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
              {item.properties.height && (
                <div>
                  <b>Height: </b>
                  {item.properties.height}
                </div>
              )}
              {item.properties.population && (
                <div>
                  <b>Population: </b>
                  {item.properties.population}
                </div>
              )}
              {item.properties.passengers && (
                <div>
                  <b>Passengers: </b>
                  {item.properties.passengers}
                </div>
              )}
            </Typography>
            <Typography
              sx={{ fontWeight: 500, color: "black" }}
              variant="body1"
              component="div"
            >
              {item.properties.gender && (
                <div>
                  <b>Gender: </b>
                  {item.properties.gender}
                </div>
              )}
              {item.properties.terrain && (
                <div>
                  <b>Terrain: </b>
                  {item.properties.terrain}
                </div>
              )}
              {item.properties.manufacturer && (
                <div>
                  <b>Manufacturer: </b>
                  {item.properties.manufacturer}
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
