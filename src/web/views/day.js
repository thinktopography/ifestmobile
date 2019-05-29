import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { daySelector, performancesByDateSelector } from '../components/container/selectors'
import Performance from './performance'
import moment from 'moment'

class Day extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  static propTypes = {
    day: PropTypes.object,
    performances: PropTypes.array
  }

  render() {
    const { day, performances } = this.props
    return (
      <div className="list-container">
        <div className="list">
          { performances.map((segment, index) => {
            const sponsor_names = (segment.sponsors) ? segment.sponsors.map(sponsor => sponsor.name).join(' and ') : null
            return (
              <ul key={`location_${index}`}>
                <li className={`list-label ${segment.location.title.replace(' ', '-').toLowerCase()}`}>{segment.location.title}</li>
                { segment.sponsors.length > 0 && <li className="sponsor-list-label" style={{color: segment.location.color}}>Sponsored by {sponsor_names}</li> }
                { segment.performances.map((performance, index) => {
                  return <Performance key={`performance_${index}`} performance={ performance } to={`/dates/${day.id}/artists/${performance.id}`} />
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
      title: moment(this.props.day.title).format('dddd, MMM DD'),
      back: '/dates'
    })
  }

}

const mapStateToProps = (state, props) => ({
  day: daySelector(state.data, props.match.params),
  performances: performancesByDateSelector(state.data, props.match.params)
})

export default connect(mapStateToProps)(Day)
