import React, { useState, useEffect, useContext }from 'react'
import Container from '@material-ui/core/Container';
import Nav from './Nav'
import { UserContext } from './UserContext'



export default function Dashboard() {
 const {user, setUser} = useContext(UserContext);

    return (
        <div>
        <Nav/>
        <Container maxWidth="md">
        <h2>Hello from Dashboard! (Main "/" route or landing page)</h2>
        { user != undefined &&
        <span>{user.password}</span>
}
        </Container>
        </div>
    )
}