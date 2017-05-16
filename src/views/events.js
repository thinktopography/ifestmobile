import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Events extends React.Component {

  render() {
    const { events } = this.props
    return (
      <div className="faq">
        <ul className="list">
          {events.map((event, index) => {
            return (
              <li key={`event${index}`} className="list-item">
                <Link to={`/events/${event.id}`}>
                  <div className="list-item-description">
                    <img src={event.photo + '?fit=crop&bg=FFFFFF&w=125&h=125&dpr=2'} className="event"/>
                    <h4>{event.title}</h4>
                    <p className="location">
                      <strong>{event.venue}</strong>
                      <br/>
                      {event.location}
                      <br/>
                      {event.day[0]}
                      <br/>
                      {event.time}
                    </p>
                    <p className="description">{event.preview}</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

}

const mapStateToProps = (state, props) => ({
  events: state.data.special_events
})

export default connect(mapStateToProps)(Events)
