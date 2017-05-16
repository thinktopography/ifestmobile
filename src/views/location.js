import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { locationSelector, performancesByLocationSelector } from '../components/container/selectors'
import Performance from './performance'

class Location extends React.Component {

  render() {
    const { location, performances } = this.props
    return (
      <div>
        <div>
          { performances.map((segment, index) => {
            return (
              <ul key={`day_${index}`} className="list">
                <li className="list-label" style={{backgroundColor: segment.day.color}}>{segment.day.title}</li>
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

}

const mapStateToProps = (state, props) => ({
  location: locationSelector(state.data, props.match.params),
  performances: performancesByLocationSelector(state.data, props.match.params)
})

export default connect(mapStateToProps)(Location)
