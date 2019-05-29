import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { locationSelector, performancesByLocationSelector } from '../components/container/selectors'
import Performance from './performance'
import moment from 'moment'

class Location extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  static propTypes = {
    location: PropTypes.object,
    performances: PropTypes.array
  }

  render() {
    const { location, performances } = this.props
    return (
      <div className="list-container">
        <div className="list">
          { performances.map((segment, index) => {
            const sponsor_names = (segment.sponsors) ? segment.sponsors.map(sponsor => sponsor.name).join(' and ') : null
            return (
              <ul key={`day_${index}`}>
                <li className={`list-label ${moment(segment.day.title).format('dddd').replace(' ', '-').toLowerCase()}`}>{ moment(segment.day.title).format('dddd, MMM DD') }</li>
                { segment.sponsors.length > 0 &&
                  <li className="sponsor-list-label" style={{ color: segment.day.color }}>
                    Sponsored by {sponsor_names}
                  </li>
                }
                { segment.performances.map((performance, index) => {
                  return <Performance key={`performance_${index}`} performance={ performance } to={`/locations/${location.id}/artists/${performance.id}`} />
                }) }
              </ul>
            )
          }) }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.context.header.set({
      title: this.props.location.title,
      back: '/locations'
    })
  }

}

const mapStateToProps = (state, props) => ({
  location: locationSelector(state.data, props.match.params),
  performances: performancesByLocationSelector(state.data, props.match.params)
})

export default connect(mapStateToProps)(Location)
