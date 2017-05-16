import React from 'react'
import PropTypes from 'prop-types'

class Map extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  render() {
    return (
      <div className="map" ref="map">
        <img src="http://cdn.sitemandala.com/assets/109009/map.jpg" />
      </div>
    )
  }

}

export default Map
