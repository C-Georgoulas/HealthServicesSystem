
import React, { useState, useEffect, useContext }from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {useLocation, useHistory} from 'react-router';
import AuthService from "../services/auth.service";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Nav from './Nav'
import { UserContext } from './UserContext'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "black",
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    button2: {
      color: "red",
      marginRight: theme.spacing(2),
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const {user, setUser} = useContext(UserContext);


  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {/* {['Trainees', 'Patients', 'Tasks', 'Admit Patient'].map((text, index) => ( */}
          {/* // React routing is done through component={Link} to= designatedPath
          // In our case we loop through the array */}
          {/* make sure to add / infront of to= */}
          { user.role != "trainee" &&
          <ListItem button key="Admit" component={Link} to="/patients/create">
            <ListItemText primary="Admit Patient" />
          </ListItem>
          }
          <ListItem button key="Patients" component={Link} to="/patients">
            <ListItemText primary="Patients" />
          </ListItem>
          <ListItem button key="Prescriptions" component={Link} to="/prescriptions">
            <ListItemText primary="Prescriptions" />
          </ListItem>
        {/* ))} */}
      </List>
      <Divider />
      <List>
        {/* {['Actions', 'Prescriptions', 'Administration'].map((text, index) => ( */}
          <ListItem button key="Pharmaceutical" component={Link} to="/drugs">
            <ListItemText primary="Medications" />
          </ListItem>
          { user.role === "instructor" &&
          <ListItem button key="Trainees" component={Link} to="/trainees">
            <ListItemText primary="Trainees" />
          </ListItem>
          }
          { user.role === "admin" &&
          <ListItem button key="Trainees" component={Link} to="/trainees">
            <ListItemText primary="Trainees" />
          </ListItem>
          }
          <Divider />
          { user.role === "admin" &&
          <ListItem button key="Administration" component={Link} to="/administration">
            <ListItemText primary="Administration" />
          </ListItem>
          }
          { user.role === "instructor" &&
          <ListItem button key="Administration" component={Link} to="/administration">
            <ListItemText primary="Administration" />
          </ListItem>
          }
        {/* ))} */}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const history = useHistory();

  const logout = () => {
    AuthService.logout();
    history.push("/login")
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            HPMWS
          </Typography>
          <Button color="inherit" className={classes.button2} onClick={logout}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default ResponsiveDrawer;