import React from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'

import EventList from '../src/components/events/List'
import EventShow from '../src/components/events/Show'
import Register from '../src/components/registrations/Register'

function App() {
  return (
   <BrowserRouter>
   <div>
   <h1>Events Registration App</h1>
      <Link to="/">Home</Link>||
      <Link to="/events">Events</Link>
      <Switch>
         <Route path="/events/:eventId/register" component={Register}/>
         <Route path="/events/:eventId" component={EventShow}/>
         <Route path="/events" component={EventList} exact={true}/>
         
      </Switch>
    </div>
    </BrowserRouter>
  )
}

export default App;
