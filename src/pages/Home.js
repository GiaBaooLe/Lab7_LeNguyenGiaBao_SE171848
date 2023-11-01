import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../components/Navigation';



function Home() {
  const url = 'https://65375a84bb226bb85dd31896.mockapi.io/api/v1/staffManagement';
  const [data, setData] = useState([]);
 
  

  useEffect(() => {
    axios(url)
      .then((response) => {
        const fetchedData = response.data;
        const sortedAge = fetchedData.sort((a, b) => b.age - a.age);
        setData(sortedAge);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div className="Home">
  <Navigation />
  
      <div className="content" style={{ padding: '100px 0' }}>
      
        <h1>Home</h1>
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {data.map((data) => (
            <Grid item xs={2} sm={4} md={4} key={data.id}>
              <Card sx={{ maxWidth: 345 }} style={{ marginBottom: 20 }}>
                <CardMedia sx={{ height: 140 }} image={data.avatar} title={data.name} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.name}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {data.age} years old
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.address}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/detail/${data.id}`}>
                    <Button size="small">Detail</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Home;
