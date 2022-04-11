import React, { useContext } from "react";
import { CardMedia, Stack, Typography, Breadcrumbs } from "@mui/material";
import { useParams } from "react-router";
import { Context } from "../context/appContext";
import Link from "@mui/material/Link";
import RelatedItems from "../components/RelatedItems.jsx";

const placeholderText1 =
  "Lorem ipsum dolor sit amet, dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident.";
const placeholderText2 =
  "At vero eos et accusamus et deleniti atque corrupti quos dolores, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.";

const Details = () => {
  let params = useParams();
  let context = useContext(Context);

  let myItem = {};
  if (params.type === "characters") {
    myItem = context.store.people.find((eachObj) => {
      return eachObj.uid === params.id;
    });
  } else {
    myItem = context.store[params.type].find((eachObj) => {
      return eachObj.uid === params.id;
    });
  }

  let imageSource = "";
  if (myItem.uid === "1" && params.type === "planets") {
    imageSource = `https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_%28fictional_desert_planet%29.jpg`;
  } else {
    imageSource = `https://starwars-visualguide.com/assets/img/${params.type}/${myItem.uid}.jpg`;
  }

  return (
    <div className="details-page">
      <Breadcrumbs aria-label="breadcrumb" margin="20px 0" fontWeight="700">
        <Link underline="none" color="black">
          HOME
        </Link>
        <Link underline="none" color="black">
          {params.type.toUpperCase()}
        </Link>
        <Typography color="text.primary">{myItem.properties.name}</Typography>
      </Breadcrumbs>
      <Stack flexDirection="row">
        <Stack minWidth="40%">
          <CardMedia
            component="img"
            height="430px"
            image={imageSource}
            sx={{ filter: "brightness(100%)" }}
          />
        </Stack>
        <Stack
          flexDirection="column"
          fontWeight="500"
          padding=" 20px 40px"
          paddingRight="0"
        >
          <Stack sx={{ textAlign: "justify", color: "black" }}>
            <Typography fontWeight="700" variant="h4">
              {myItem.properties.name.toUpperCase()}
            </Typography>
            <p />
            <Typography variant="body1">{placeholderText1}</Typography>
            <p />
            <Typography variant="body1">{placeholderText2}</Typography>
          </Stack>
          {params.type === "characters" && (
            <Stack
              fontWeight="600"
              variant="h4"
              sx={{ marginTop: "20px", color: "black" }}
              flexDirection="column"
            >
              <Stack flexDirection="row">
                Height: {myItem.properties.height}
              </Stack>
              <Stack flexDirection="row">Mass: {myItem.properties.mass}</Stack>
              <Stack flexDirection="row">
                Birth Year: {myItem.properties.birth_year}
              </Stack>
              <Stack flexDirection="row">
                Eye Color: {myItem.properties.eye_color}
              </Stack>
              <Stack flexDirection="row">
                Skin Color: {myItem.properties.skin_color}
              </Stack>
            </Stack>
          )}
          {params.type === "planets" && (
            <Stack
              fontWeight="600"
              variant="h4"
              sx={{ marginTop: "20px", color: "black" }}
              flexDirection="column"
            >
              <Stack flexDirection="row">
                Diameter: {myItem.properties.diameter}
              </Stack>
              <Stack flexDirection="row">
                Climate: {myItem.properties.climate}
              </Stack>
              <Stack flexDirection="row">
                Gravity: {myItem.properties.gravity}
              </Stack>
              <Stack flexDirection="row">
                Population: {myItem.properties.population}
              </Stack>
              <Stack flexDirection="row">
                Terrain: {myItem.properties.terrain}
              </Stack>
            </Stack>
          )}
          {params.type === "vehicles" && (
            <Stack
              fontWeight="600"
              variant="h4"
              sx={{ marginTop: "20px", color: "black" }}
              flexDirection="column"
            >
              <Stack flexDirection="row">
                Passengers: {myItem.properties.passengers}
              </Stack>
              <Stack flexDirection="row">Crew: {myItem.properties.crew}</Stack>
              <Stack flexDirection="row">
                Length: {myItem.properties.length}
              </Stack>
              <Stack flexDirection="row">
                Vehicle Class: {myItem.properties.vehicle_class}
              </Stack>
              <Stack flexDirection="row">
                Manufacturer: {myItem.properties.manufacturer}
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
      <RelatedItems
        store={context.store}
        currentItem={myItem}
        currentType={params.type}
      />
    </div>
  );
};

export default Details;
