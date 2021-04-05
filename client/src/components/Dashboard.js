import React, { useState, useEffect, useContext }from 'react'
import Container from '@material-ui/core/Container';
import Nav from './Nav'
import { UserContext } from './UserContext'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "auto",
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
    //   backgroundColor: red[500],
    },
  }));


export default function Dashboard() {
 const {user, setUser} = useContext(UserContext);
 const classes = useStyles();
 const [dense, setDense] = React.useState(false);

 const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    return (
        <div>
        <Nav/>
        <Container maxWidth="md">
            <br></br>
        <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar alt={user.name} src="/static/images/avatar/1.jpg" className={classes.avatar}>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user.name}
        subheader={user.department}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Welcome back! Please remember to check your tasks and notifications for any updates you may have missed.
          {user.notifications &&  user.notifications.length > 0 &&
      <>
    {user.notifications && user.notifications.map((notification) => (
      <>
        <p>{notification.title}</p>
        <p>{new Date(notification.addedOnDate).toDateString()}</p>
        </>
    ))}
    </>
    }
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <Tooltip title="Notifications and Tasks">
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Notifications:</Typography>
          <div className={classes.demo}>
            <List dense={dense}>
            {user.notifications && user.notifications.map((notification) => (
                <ListItem>
                  <ListItemText
                    primary={notification.details}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
            ))}
            </List>
          </div>
            
        </CardContent>
      </Collapse>
    </Card>
        </Container>
        </div>
    )
}