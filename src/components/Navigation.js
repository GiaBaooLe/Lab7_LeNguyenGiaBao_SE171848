import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { jwtDecode as jwt_decode } from "jwt-decode";

const pages = ["HOME", "DASHBOARD", "CONTACT", "PROFILE", "LOGOUT"];

function Navigation() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [userGg, setUserGg] = useState();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  React.useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      const decoded = jwt_decode(jwtToken);
      setUserGg(decoded);
    }
  }, []);

  return (
    <AppBar position="static" style={{ backgroundColor: "#1E90FF" }}>
      <div className="content">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 20,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link
                    to={
                      page === "HOME"
                        ? "/"
                        : page === "LOGOUT"
                        ? "/login"
                        : `/${page.toLowerCase()}`
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center" style={{ color: "#000" }}>
                        {page}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h4"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Lab 7
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link
                  to={
                    page === "HOME"
                      ? "/"
                      : page === "LOGOUT"
                      ? "/login"
                      : `/${page.toLowerCase()}`
                  }
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ mr: 6, my: 2, color: "#fff", display: "block" }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            {userGg ? (
              <div className="gguser" >
                
                <Avatar style={{marginTop:"15px"}} alt={userGg.name} src={userGg.picture} />
                 <p>{userGg.name}</p>
              </div>
            ) : (
              <a href="/login"></a>
            )}
          </Toolbar>
        </Container>
      </div>
    </AppBar>
  );
}
export default Navigation;
