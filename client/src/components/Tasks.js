import React, { useState, useEffect }from 'react'
import Container from '@material-ui/core/Container';
import Nav from './Nav'


export default function Tasks() {

    return (
        <div>
        <Nav/>
        <Container maxWidth="md">
        <h2>Hello from Task Component! (Main "/" route)</h2>
        </Container>
        </div>
    )
}