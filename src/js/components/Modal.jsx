import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import { Context } from "../context/appContext";
import { Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  borderRadius: "5px",
  boxShadow: 10,
  p: 4,
};

const BasicModal = () => {
  let context = React.useContext(Context);

  //const [currentTab, setCurrentTab] = React.useState("login");

  const handleClose = () => {
    context.actions.setLoginModal(false);
  };

  const handleLoginClick = () => {
    context.actions.setLoginModal(true);
    context.actions.setCurrentTab("login");
  };

  return (
    <div>
      <Typography
        onClick={handleLoginClick}
        variant="body1"
        noWrap
        className="hover-text"
        sx={{
          marginLeft: "30px",
          fontWeight: "800",
          flexGrow: 1,
          cursor: "pointer",
        }}
        color="#080808"
      >
        LOG IN
      </Typography>
      <Modal
        open={context.store.loginModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {context.store.currentTab === "login" ? (
            <>
              <div>
                <Login />
              </div>
              <Stack
                flexDirection={"row"}
                sx={{ alignItems: "center", margin: "5px 0 10px 0" }}
              >
                <Typography variant={"body1"}>
                  Don't have an account?
                </Typography>
                <Typography
                  onClick={() => context.actions.setCurrentTab("signup")}
                  variant={"body1"}
                  className="hover-text"
                  sx={{ cursor: "pointer", marginLeft: "5px" }}
                >
                  <b>Sign Up</b>
                </Typography>
              </Stack>
            </>
          ) : (
            <>
              <div>
                <Signup />
              </div>
              <Stack
                flexDirection={"row"}
                sx={{ alignItems: "center", margin: "5px 0 10px 0" }}
              >
                <Typography variant={"body1"}>
                  Already have an account?
                </Typography>
                <Typography
                  onClick={() => context.actions.setCurrentTab("login")}
                  variant={"body1"}
                  className="hover-text"
                  sx={{ cursor: "pointer", marginLeft: "5px" }}
                >
                  <b>Log In</b>
                </Typography>
              </Stack>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
