import React, { useState, useEffect }from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import Nav from './Nav';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();


  return (
    <React.Fragment>
        <Nav/>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
        <Fade in={true} timeout={3500}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
             Administration Control Panel
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Manage all system users and all pharmaceutical drugs
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" component={Link} to="/users">
                    MANAGE SYSTEM USERS
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" component={Link} to="/drugs/create">
                    MANAGE PHARMACEUTICALS
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
          </Fade>
        </div>
      </main>
    </React.Fragment>
  );
}