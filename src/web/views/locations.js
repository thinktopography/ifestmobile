import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Locations extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  static propTypes = {
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
        { locations.sort(sort).map((location, index) => (
          <Link key={`location_${index}`} to={`/stages/${location.id}`} className={location.title.replace(' ', '-').toLowerCase()}>
            <h4>{location.title}</h4>
          </Link>
        )) }
      </div>
    )

  }

  componentDidMount() {
    this.context.header.set({
      pageTitle: 'Stages',
      title: 'Mobile Schedule',
      back: null
    })
    const ga = window.ga.getAll()[0]
    ga.set({
      page: '/stages',
      title: 'Stages'
    })
    ga.send('pageview')
  }

}

const mapStateToProps = state => ({
  locations: state.data.locations
})

export default connect(mapStateToProps)(Locations)
