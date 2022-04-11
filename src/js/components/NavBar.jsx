import { Link } from "react-router-dom";
import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  MenuItem,
  Container,
  Menu,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext } from "react";
import { Context } from "../context/appContext";
import ListItem from "./ListItem.jsx";

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { store } = useContext(Context);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      sx={{ boxShadow: "none", backgroundColor: "#fff" }}
      position="static"
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link to="/" sx={{ textDecoration: "none" }}>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                fontWeight: "800",
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
              color="#080808"
            >
              STAR WARS
            </Typography>
          </Link>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              fontWeight: "800",
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
            color="#080808"
          >
            STAR WARS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
          <Typography paddingBottom="2px" fontWeight="700" component="div">
            ({store.favorites.length})
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            {store.favorites.length != 0 ? (
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: "5px", cursor: "pointer" }}
              >
                <FavoriteIcon fontSize="medium" sx={{ color: "#080808" }} />
              </IconButton>
            ) : (
              <IconButton sx={{ p: "5px", cursor: "pointer" }}>
                <FavoriteIcon fontSize="medium" sx={{ color: "#080808" }} />
              </IconButton>
            )}
            <Menu
              sx={{ mt: "48px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {store.favorites.length != 0 ? (
                store.favorites.map((eachObj, i) => (
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
