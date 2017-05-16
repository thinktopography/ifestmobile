import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import { locationSelector, performancesByLocationSelector } from '../components/container/selectors'
import Performance from './performance'

class Location extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  render() {
    const { location, performances } = this.props
    return (
      <div>
        <div>
          { performances.map((segment, index) => {
            const sponsor_names = (segment.sponsors) ? segment.sponsors.map(sponsor => sponsor.name).join(' and ') : null
            return (
              <ul key={`day_${index}`} className="list">
                <li className="list-label" style={{ backgroundColor: segment.day.color }}>{ segment.day.title }</li>
                { segment.sponsors.length > 0 &&
                  <li className="sponsor-list-label" style={{ color: segment.day.color }}>
                    Sponsored by {sponsor_names}
                  </li>
                }
                { segment.performances.map((performance, index) => {
                  return <Performance key={`performance_${index}`} performance={ performance } />
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
