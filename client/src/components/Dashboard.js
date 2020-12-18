import React, { useState, useEffect }from 'react'
import Container from '@material-ui/core/Container';
import Nav from './Nav'



export default function Dashboard() {

    return (
        <div>
        <Nav/>
        <Container maxWidth="md">
        <h2>Hello from Dashboard! (Main "/" route or landing page)</h2>
        </Container>
        </div>
    )
}