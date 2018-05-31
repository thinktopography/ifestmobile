import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { eventSelector } from '../components/container/selectors'

class Event extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  render() {
    const { event } = this.props
    let styleProps = {
      backgroundImage: `url(${event.photo ? `${event.photo}?fit=crop&bg=FFFFFF&w=125&h=125&dpr=2` : '/images/logo.png'})`,
      backgroundPosition: 'center center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    }
    return (
      <div className="performer">
        <div className="performer-image" style={styleProps} />
        <div className="performer-details">
          <h2 className="event-heading">
            {event.title}
            <br />
            <small>{event.cost}</small>
          </h2>
          <p className="location lead">
            <strong>{event.venue}</strong>
            <br/>
            {event.day[0]}
            <br/>
            {event.location}
            <br />
            {event.time}
          </p>
          <div className="description" dangerouslySetInnerHTML={{__html: event.description}}/>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.context.header.set({
      title: 'Event Details',
      back: '/events'
    })
  }

}

const mapStateToProps = (state, props) => ({
  event: eventSelector(state.data, props.match.params)
})

export default connect(mapStateToProps)(Event)
