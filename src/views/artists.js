import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Performance from './performance'

class Artists extends React.Component {

  static PropTypes = {
    artists: PropTypes.array
  }

  render() {

    const { performances } = this.props

    const sort = (a,b) => {
      if(a.title.toLowerCase() < b.title.toLowerCase()) return -1
      if(a.title.toLowerCase() > b.title.toLowerCase()) return 1
      return 0
    }

    return (
      <div className="list-container">
        <ul className="list">
          <li className="list-search">
            <input ref="searchField" type="text" placeholder="Search performers, genres, or locations" />
          </li>
        </ul>
        <ul className="list">
          {performances.sort(sort).map((performance, index) => {
            return <Performance key={`performance_${index}`} performance={ performance } />
          })}
        </ul>
      </div>
    )

  }

}

const mapStateToProps = state => ({
  performances: state.data.performances
})

export default connect(mapStateToProps)(Artists)
