import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Root from './root'
import Footer from './components/footer'
import Header from './components/header'
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
        <div className="application">
          <Header />
          <div className="body">
            <CSSTransitionGroup  transitionName="fade" transitionAppear={true} transitionAppearTimeout={ 500 } transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
              <Route exact path="/dates" component={ Days } key="dates" />
              <Route exact path="/dates/:id" component={ Day } key="date" />
              <Route exact path="/locations" component={ Locations } key="locations" />
              <Route exact path="/locations/:id" component={ Location } key="location" />
              <Route exact path="/artists" component={ Artists } key="artists" />
              <Route exact path="/artists/:id" component={ Artist } key="artist" />
              <Route exact path="/map" component={ Map } key="map" />
              <Route exact path="/events" component={ Events } key="events" />
              <Route exact path="/events/:id" component={ Event } key="event" />
              <Route path="/vendors" component={ Vendors } key="vendors" />
              <Route path="/info" component={ Info } key="info" />
            </CSSTransitionGroup>
          </div>
          <Footer />
        </div>
      </Router>
    </Container>
  </Root>
)

ReactDOM.render(<IFest />, document.getElementById('app-container'))
