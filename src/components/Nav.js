import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'

function Nav() {
  return (
    <AppBar position="static" style={{ backgroundColor: "#606060" }}>
      <div className="content">
        <Container maxWidth="xl">
        </Container>
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
              Lab7
            </Typography>
        </Toolbar>
        </div>
        </AppBar>
  )
}

export default Nav