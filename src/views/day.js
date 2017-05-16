import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
import { daySelector, performancesByDateSelector } from '../components/container/selectors'
import Performance from './performance'

class Day extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  render() {
    const { day, performances } = this.props
    return (
      <div>
        <div>
          { performances.map((segment, index) => {
            const sponsor_names = (segment.sponsors) ? segment.sponsors.map(sponsor => sponsor.name).join(' and ') : null
            return (
              <ul key={`location_${index}`} className="list">
                <li className="list-label" style={{backgroundColor: segment.location.color}}>{segment.location.title}</li>
                { segment.sponsors.length > 0 && <li className="sponsor-list-label" style={{color: segment.location.color}}>Sponsored by {sponsor_names}</li> }
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
      title: this.props.day.title,
      back: '/dates'
    })
  }

}

const mapStateToProps = (state, props) => ({
  day: daySelector(state.data, props.match.params),
  performances: performancesByDateSelector(state.data, props.match.params)
})

export default connect(mapStateToProps)(Day)
