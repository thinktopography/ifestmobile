import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Locations extends React.Component {

  static PropTypes = {
    locations: PropTypes.array
  }

  render() {

    const { locations } = this.props

    const sort = (a,b) => {
      if(a.id < b.id) return -1
      if(a.id > b.id) return 1
      return 0
    }

    return (
      <div className="stage-tiles">
        { locations.sort(sort).map((location, index) => {
          return (
            <Link key={`location_${index}`} to={`/locations/${location.id}`} className={location.class} style={{ backgroundColor: location.color }}>
              <h4>{location.title}</h4>
            </Link>
          )
        }) }
      </div>
    )

  }

}

const mapStateToProps = state => ({
  locations: state.data.locations
})

export default connect(mapStateToProps)(Locations)
