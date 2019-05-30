import React from 'react'
import PropTypes from 'prop-types'

class Map extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  render() {
    return (
      <div className="map">
        <h2>Festival Map</h2>
        <img src="/images/2019-map.jpg" />
        <h2>Commons Map</h2>
        <img src="/images/2019-commons-map.jpg" />
      </div>
    )
  }

  componentDidMount() {
    this.context.header.set({
      pageTitle: 'Maps',
      title: 'Maps',
      back: null
    })
    const ga = window.ga.getAll()[0]
    ga.set({
      page: '/maps',
      title: 'Maps'
    })
    ga.send('pageview')
  }

}

export default Map
