import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Performance extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  static PropTypes = {
    performance: PropTypes.aobjectrray
  }

  render() {
    const { performance, to } = this.props
    const thumbnail = performance.photo ?`${performance.photo}?fit=crop&bg=FFFFFF&w=125&h=125&dpr=2` : '/images/logo.png'
    return (
      <li className="list-item">
        <Link to={to}>
          <div className="list-item-image" style={{backgroundColor: '#C32021'}}>
            <img src={thumbnail}/>
          </div>
          <div className="list-item-details">
            <p className="time">{performance.time}</p>
            <h4>{performance.title}</h4>
            <p className="location">{performance.location}</p>
            <p className="description">{performance.description}</p>
          </div>
        </Link>
      </li>
    )

  }

}

export default Performance
