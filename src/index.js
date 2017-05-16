import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Root from './root'
import Application from './components/application'
import Container from './components/container'
import Days from './views/days'
import Day from './views/day'
import Locations from './views/locations'
import Location from './views/location'
import Artists from './views/artists'
import Artist from './views/artist'
import Map from './views/map'
import Events from './views/events'
import Event from './views/event'
import Vendors from './views/vendors'
import Info from './views/info'
import './style.less'

const IFest = () => (
  <Root>
    <Container>
      <Router>
        <Route render={({ location }) => (
          <Application key={location.key}>
            <Route exact path="/" component={ Days } />
            <Route exact path="/dates" component={ Days } />
            <Route exact path="/dates/:id" component={ Day } />
            <Route exact path="/locations" component={ Locations } />
            <Route exact path="/locations/:id" component={ Location } />
            <Route exact path="/artists" component={ Artists } />
            <Route exact path="/artists/:id" component={ Artist } />
            <Route exact path="/map" component={ Map } />
            <Route exact path="/events" component={ Events } />
            <Route exact path="/events/:id" component={ Event } />
            <Route path="/vendors" component={ Vendors } />
            <Route path="/info" component={ Info } />
          </Application>
        )}/>
      </Router>
    </Container>
  </Root>
)

ReactDOM.render(<IFest />, document.getElementById('app-container'))
