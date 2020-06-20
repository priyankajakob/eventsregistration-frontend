import React from 'react'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'

import EventList from '../events/List'
import EventShow from '../events/Show'
import Register from '../registrations/Register'


import '../../styles/Navbar.css'

const NavBar = (props) => {
    return(
        
        <BrowserRouter>
            <div className="navbar">
                <Link to="/" className="link1">Home</Link>||
                <Link to="/events" className="link2">Events</Link>
                <Switch>
                    <Route path="/events/:eventId/register" component={Register}/>
                    <Route path="/events/:eventId" component={EventShow}/>
                    <Route path="/events" component={EventList} exact={true}/> 
                </Switch>
                
            </div>
        </BrowserRouter>
    )
}
export default NavBar