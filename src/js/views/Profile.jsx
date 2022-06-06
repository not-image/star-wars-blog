import * as React from "react";
import { Context } from "../context/appContext";
import { Typography, Stack, CardMedia } from "@mui/material";
import FavoriteItem from "../components/FavoriteItem.jsx";
import PhraseGenerator from "../components/PhraseGenerator.jsx";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  let context = React.useContext(Context);
  let navigate = useNavigate();

  let imageSource = "";
  if (context.store.user.planet === "Earth") {
    imageSource = `https://images.pexels.com/photos/41953/earth-blue-planet-globe-planet-41953.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;
  } else if (context.store.user.planet === "Tatooine") {
    imageSource = `https://upload.wikimedia.org/wikipedia/en/6/6d/Tatooine_(fictional_desert_planet).jpg`;
  } else {
    let planet = context.store.planets.find((eachObj) => {
      return eachObj.name === context.store.user.planet;
    });
    imageSource = `https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`;
  }

  const handleClick = () => {
    context.actions.logout();
    navigate("/");
    context.actions.setLoginModal(false);
  };

  return (
    <>
      <Stack flexDirection="row">
        <Stack
          flexDirection={"column"}
          width={"30%"}
          height={"100%"}
          justifyContent={"space-between"}
        >
          <Stack flexDirection={"column"} sx={{ marginTop: "50px" }}>
            <Typography
              variant={"h5"}
              sx={{ marginBottom: "30px", fontWeight: 600 }}
              component={"div"}
            >
              User information
            </Typography>
            <Typography
              variant={"h6"}
              sx={{ marginBottom: "5px" }}
              component={"div"}
            >
              <b>Username:</b> {context.store.user.username}
            </Typography>
            <Typography variant={"h6"} component={"div"}>
              <b>Planet of residence:</b> {context.store.user.planet}
            </Typography>
            <CardMedia
              component="img"
              height="350px"
              image={imageSource}
              sx={{ filter: "brightness(100%)", paddingTop: "20px" }}
            />
            <Stack flexDirection={"row"} sx={{ marginTop: "20px" }}>
              <PhraseGenerator store={context.store} />
            </Stack>

            <Typography
              variant={"h6"}
              onClick={handleClick}
              sx={{ cursor: "pointer", marginTop: "130px" }}
            >
              <b>Log out of your account</b>
            </Typography>
          </Stack>
        </Stack>
        <Stack
          flexDirection={"column"}
          width={"25%"}
          sx={{ marginLeft: "25%", marginTop: "50px" }}
        >
          <Typography
            variant={"h5"}
            sx={{ marginBottom: "30px", fontWeight: 600 }}
            component={"div"}
          >
            User favorites
          </Typography>
          {context.store.favorites.length != 0 ? (
            context.store.favorites.map((eachObj, i) => (
              <FavoriteItem key={eachObj.name} index={i} eachObj={eachObj} />
            ))
          ) : (
            <Typography variant={"h6"} component={"div"}>
              <b>No Favorites</b>
            </Typography>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Profile;
