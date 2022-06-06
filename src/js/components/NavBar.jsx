import { useNavigate } from "react-router-dom";
import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  MenuItem,
  Container,
  Menu,
  Stack,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext } from "react";
import { Context } from "../context/appContext";
import ListItem from "./ListItem.jsx";
import Modal from "./Modal.jsx";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: "5px",
    top: 25,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    fontWeight: 700,
    fontSize: "11px",
  },
}));

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const context = useContext(Context);
  let navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleClick = () => {
    //context.actions.setLoadingScreen(true);
    setTimeout(() => {
      navigate("/");
      //context.actions.setLoadingScreen(false);
    }, 150);
  };

  return (
    <AppBar
      sx={{ boxShadow: "none", backgroundColor: "#fff", padding: "3px 0" }}
      position="static"
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            onClick={handleClick}
            component="div"
            sx={{
              fontWeight: "800",
              mr: 2,
              display: { xs: "none", md: "flex" },
              cursor: "pointer",
            }}
            color="#080808"
          >
            STAR WARS
          </Typography>

          <Typography
            variant="h5"
            noWrap
            onClick={handleClick}
            component="div"
            sx={{
              fontWeight: "800",
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              cursor: "pointer",
            }}
            color="#080808"
          >
            STAR WARS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
          <Stack sx={{ marginRight: "30px", flexDirection: "row" }}>
            <Typography
              onClick={handleProfileClick}
              variant="body1"
              noWrap
              className="hover-text"
              sx={{
                fontWeight: "800",
                flexGrow: 1,
                cursor: "pointer",
              }}
              color="#080808"
            >
              PROFILE (protected route)
            </Typography>
            {context.store.user.token != "" ? "" : <Modal />}
          </Stack>

          <Box sx={{ flexGrow: 0 }}>
            {context.store.favorites.length != 0 ? (
              <StyledBadge
                onClick={handleOpenUserMenu}
                badgeContent={context.store.favorites.length}
                color="primary"
                sx={{ cursor: "pointer" }}
              >
                <IconButton sx={{ p: "5px", cursor: "pointer" }}>
                  <FavoriteIcon fontSize="medium" sx={{ color: "#080808" }} />
                </IconButton>
              </StyledBadge>
            ) : (
              <StyledBadge
                badgeContent={context.store.favorites.length}
                color="primary"
              >
                <IconButton sx={{ p: "5px", cursor: "pointer" }}>
                  <FavoriteIcon fontSize="medium" sx={{ color: "#080808" }} />
                </IconButton>
              </StyledBadge>
            )}

            <Menu
              sx={{ mt: "53px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {context.store.favorites.length != 0 ? (
                context.store.favorites.map((eachObj, i) => (
                  <MenuItem key={i}>
                    <ListItem
                      onLinkClick={handleCloseUserMenu}
                      eachObj={eachObj}
                    />
                  </MenuItem>
                ))
              ) : (
                <MenuItem sx={{ minHeight: "30px" }}>No Favorites</MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
