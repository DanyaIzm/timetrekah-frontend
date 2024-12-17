import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu"; // Import MenuIcon for the mobile menu
import AuthContext from "../contexts/auth-context";
import useUser from "../hooks/use-user";
import Logo from "./Logo";

const Header = ({ onLogin, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { login, logout } = useContext(AuthContext);
  const { user } = useUser();
  const navigate = useNavigate();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="static" color="info">
      <Toolbar>
        <Box flexGrow={1} display="flex" alignItems="center">
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              borderRadius: "50%",
              overflow: "hidden",
              width: "50px",
              height: "50px",
            }}
          >
            <Logo />
          </Box>
          {!isMobile ? (
            <>
              <Button
                sx={{ marginLeft: 1 }}
                color="inherit"
                component={Link}
                to="/history"
              >
                History
              </Button>
              <Button color="inherit" component={Link} to="/table">
                Table
              </Button>
              <Button color="inherit" component={Link} to="/activities">
                Activities
              </Button>
              <Button color="inherit" onClick={handleMenuClick}>
                New
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/create-activity"
                >
                  Activity
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/create-title"
                >
                  Title
                </MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton
              color="inherit"
              onClick={toggleDrawer}
              sx={{ marginLeft: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
        {user ? (
          <>
            <Typography
              variant="body1"
              sx={{ marginLeft: "auto", marginRight: "16px", color: "white" }}
            >
              {user.username}
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
      {/* Drawer for mobile navigation */}
      {isMobile && (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          <Box
            sx={{ width: 180 }}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
          >
            <Button component={Link} to="/history">
              History
            </Button>
            <Button component={Link} to="/table">
              Table
            </Button>
            <Button component={Link} to="/activities">
              Activities
            </Button>
            <Button component={Link} to="/create-activity">
              New activity
            </Button>
            <Button component={Link} to="/create-title">
              New title
            </Button>
          </Box>
        </Drawer>
      )}
    </AppBar>
  );
};

export default Header;
