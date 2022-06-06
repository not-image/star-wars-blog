import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { Context } from "../context/appContext";

const PleaseLogin = () => {
  let context = React.useContext(Context);

  const handleLoginClick = () => {
    context.actions.setLoginModal(true);
    context.actions.setCurrentTab("login");
  };

  const handleSignupClick = () => {
    context.actions.setLoginModal(true);
    context.actions.setCurrentTab("signup");
  };

  return (
    <Stack
      flexDirection={"column"}
      alignItems={"center"}
      sx={{ marginTop: "80px" }}
    >
      <Typography
        variant={"h5"}
        sx={{ fontWeight: 600, marginBottom: "10px" }}
        component={"div"}
      >
        You do not have permission to view this page.
      </Typography>
      <Typography
        variant={"h5"}
        component={"div"}
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <Box
          onClick={handleLoginClick}
          sx={{ cursor: "pointer", textDecoration: "underline", paddingRight: "7px" }}
        >
          Log In
        </Box>{" "}
        or{" "}
        <Box
          onClick={handleSignupClick}
          sx={{ cursor: "pointer", textDecoration: "underline", paddingLeft: "7px" }}
        >
          Sign Up
        </Box>
      </Typography>
    </Stack>
  );
};

export default PleaseLogin;
