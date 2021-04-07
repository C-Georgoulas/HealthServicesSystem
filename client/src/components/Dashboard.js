import React, { useState, useEffect, useContext }from 'react'
import Container from '@material-ui/core/Container';
import Nav from './Nav'
import { UserContext } from './UserContext'
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
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

  const [notifications, setNotifications] = React.useState({

  })

  useEffect(() => {
    fetch(`/api/admin/user/${user._id}/notifications`)
    .then(response => response.json())
    .then(json => setNotifications(json))
}, [])

const readNotification = (notificationStatus) => {
  // compare current date with expiration to determine if the prescription has expired
  if (notificationStatus === true) {
    return "Read"
  } else {
    return "Not Read"
  }
}

const [notification, setNotification] = React.useState({

})

const handleMenuItemClick = (notificationID, index) => {
  let updatedNotification = {
    ...notification,
    read: true,
  }
  console.log(notificationID)
  fetch(`/api/admin/notifications/${notificationID}`, {
    method: 'PUT',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({editNotification: updatedNotification})
  })
  .then(res => res.json())
  .then(data => {
    setNotification(updatedNotification)
  })
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
          <Typography paragraph>Unread Notifications:</Typography>
          <div className={classes.demo}>
            <List dense={dense}>
    {notifications &&  notifications.length > 0 &&
      <>
{ notifications
        .filter((notification, index) => {
            return readNotification(
                notification.read,
            ) === 'Not Read';
        })
        .map((notification, index) => (      <>
      { notification.isNoteNotification &&
                <ListItem key={notification._id}
                onClick={() => handleMenuItemClick(notification._id, index)}
                >
                  <Button
                  component={Link} 
                  to={`/patients/${notification.details}`}
                  >{`${new Date(notification.addedOnDate).toDateString()} (${new Date(notification.addedOnDate).toLocaleTimeString()}) — ${notification.title}`}</Button>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
        }
        { notification.isPrescriptionNotification &&
          <ListItem key={notification._id}
                onClick={() => handleMenuItemClick(notification._id, index)}
                >
                  <Button
                  component={Link} 
                  to={`/prescriptions/${notification.details}`}
                  >{`${new Date(notification.addedOnDate).toDateString()} (${new Date(notification.addedOnDate).toLocaleTimeString()}) — ${notification.title}`}</Button>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
        }
         { notification.isSurgeryNotification &&
                <ListItem key={notification._id}
                onClick={() => handleMenuItemClick(notification._id, index)}
                >
                  <Button
                  component={Link} 
                  to={`/surgeries/${notification.details}`}
                  >{`${new Date(notification.addedOnDate).toDateString()} (${new Date(notification.addedOnDate).toLocaleTimeString()}) — ${notification.title}`}</Button>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
        }
        <Divider/>
      </>
            ))}
                    </>
          }
            </List>
          </div>
          <Typography paragraph>Read Notifications:</Typography>
          <div className={classes.demo}>
            <List dense={dense}>
    {notifications &&  notifications.length > 0 &&
      <>
{ notifications
        .filter((notification, index) => {
            return readNotification(
                notification.read,
            ) === 'Read';
        })
        .map((notification, index) => (      <>
      { notification.isNoteNotification &&
                <ListItem key={notification._id}>
                  <Button
                  component={Link} 
                  to={`/patients/${notification.details}`}
                  >{`${new Date(notification.addedOnDate).toDateString()} (${new Date(notification.addedOnDate).toLocaleTimeString()}) — ${notification.title}`}</Button>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
        }
        { notification.isPrescriptionNotification &&
                <ListItem key={notification._id}>
                  <Button
                  component={Link} 
                  to={`/prescriptions/${notification.details}`}
                  >{`${new Date(notification.addedOnDate).toDateString()} (${new Date(notification.addedOnDate).toLocaleTimeString()}) — ${notification.title}`}</Button>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
        }
         { notification.isSurgeryNotification &&
                <ListItem key={notification._id}>
                  <Button
                  component={Link} 
                  to={`/surgeries/${notification.details}`}
                  >{`${new Date(notification.addedOnDate).toDateString()} (${new Date(notification.addedOnDate).toLocaleTimeString()}) — ${notification.title}`}</Button>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
        }
        <Divider/>
      </>
            ))}
                    </>
          }
            </List>
          </div>  
        </CardContent>
      </Collapse>
    </Card>
        </Container>
        </div>
    )
}