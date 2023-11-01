import React from 'react'
import Navigation from '../components/Navigation'
import { Button, ButtonBase, Grid, Paper, Typography } from '@mui/material'
import { useState } from 'react';
import { jwtDecode as jwt_decode } from "jwt-decode";
function Profile() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [userGg, setUserGg] = useState();

  React.useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      const decoded = jwt_decode(jwtToken);
      setUserGg(decoded);
    }
  }, []);
  return (
    
    <div className="content" style={{ padding: '100px 0' }}>
    <Navigation />
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: '80%',
          flexGrow: 1,
        }}
      >
        <h1>Profile</h1>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 400 }}>
              <img alt={userGg?.name} src={userGg?.picture} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container style={{ marginLeft: '20px' }}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  style={{ fontSize: '2rem', fontWeight: 'bold' }}
                >
                  Name: {userGg?.name}
                </Typography>
                <Typography variant="body2" gutterBottom style={{ fontSize: '1.4rem' }}>
                  Email: {userGg?.email}
                </Typography>
                
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  style={{
                    padding: '12px 64px',
                    backgroundColor: '#000',
                    color: '#fff',
                  }}
                >
                  Share
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default Profile