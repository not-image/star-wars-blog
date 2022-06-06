import React, { useContext } from "react";
import {
  Box,
  CardMedia,
  Stack,
  Typography,
  Breadcrumbs,
  CircularProgress,
} from "@mui/material";
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
  myItem = context.store[params.type].find((eachObj) => {
    return eachObj.uid == params.id;
  });

  let imageSource = "";
  if (myItem.id != "11") {
    imageSource = `https://starwars-visualguide.com/assets/img/${params.type}/${myItem.uid}.jpg`;
  } else {
    imageSource = `https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_(fictional_desert_planet).jpg`;
  }

  return (
    <>
      {context.store.loadingScreen ? (
        <Box>
          <CircularProgress
            sx={{
              color: "black",
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: "auto",
            }}
          />
        </Box>
      ) : (
        <div className="details-page">
          <Breadcrumbs aria-label="breadcrumb" margin="20px 0" fontWeight="700">
            <Link underline="none" color="black">
              HOME
            </Link>
            <Link underline="none" color="black">
              {params.type.toUpperCase()}
            </Link>
            <Typography color="text.primary">{myItem.name}</Typography>
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
                  {myItem.name.toUpperCase()}
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
                  <Stack flexDirection="row">Height: {myItem.height}</Stack>
                  <Stack flexDirection="row">Mass: {myItem.mass}</Stack>
                  <Stack flexDirection="row">
                    Birth Year: {myItem.birth_year}
                  </Stack>
                  <Stack flexDirection="row">
                    Eye Color: {myItem.eye_color}
                  </Stack>
                  <Stack flexDirection="row">
                    Skin Color: {myItem.skin_color}
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
                  <Stack flexDirection="row">Diameter: {myItem.diameter}</Stack>
                  <Stack flexDirection="row">Climate: {myItem.climate}</Stack>
                  <Stack flexDirection="row">Gravity: {myItem.gravity}</Stack>
                  <Stack flexDirection="row">
                    Population: {myItem.population}
                  </Stack>
                  <Stack flexDirection="row">Terrain: {myItem.terrain}</Stack>
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
                    Passengers: {myItem.passengers}
                  </Stack>
                  <Stack flexDirection="row">Crew: {myItem.crew}</Stack>
                  <Stack flexDirection="row">Length: {myItem.length}</Stack>
                  <Stack flexDirection="row">
                    Vehicle Class: {myItem.vehicle_class}
                  </Stack>
                  <Stack flexDirection="row">
                    Manufacturer: {myItem.manufacturer}
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
      )}
    </>
  );
};

export default Details;
