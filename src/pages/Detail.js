import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Button, ButtonBase, Grid, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function Detail() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const url = `https://65375a84bb226bb85dd31896.mockapi.io/api/v1/staffManagement/${id}`;
    axios(url)
      .then((response) => {
        const fetchedData = response.data;
        setStaff(fetchedData);
      })
      .catch((error) => console.log(error.message));
  }, [id]);

  if (!staff) {
    return <div>Loading...</div>;
  }

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
        <h1>Detail Staff</h1>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 400 }}>
              <Img alt={staff.name} src={staff.avatar} />
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
                  Name: {staff.name}
                </Typography>
                <Typography variant="body2" gutterBottom style={{ fontSize: '1.4rem' }}>
                  Age: {staff.age}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ fontSize: '1.4rem' }}>
                  Address: {staff.address}
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
              <Typography variant="subtitle1" component="div">
                {staff.createdAt}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default Detail;
