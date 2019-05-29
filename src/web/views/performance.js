import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Performance extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  static propTypes = {
    day: PropTypes.bool,
    performance: PropTypes.object,
    to: PropTypes.string
  }

  static defaultProps = {
    day: false
  }

  render() {
    const { day, performance, to } = this.props
    const style = {
      backgroundColor: '#C32021',
      backgroundPosition: 'center 33%',
      backgroundImage: performance.photo ? `url(${performance.photo})` : 'url(/images/logo.png)',
      backgroundSize: 'cover'
    }
    return (
      <li className="list-item">
        <Link to={to}>
          <div className="list-item-image" style={style} />
          <div className="list-item-details">
            <p className="time">{performance.time}</p>
            <h4>{performance.title}</h4>
            <p className="location">
              { day && performance.day && <span>{ performance.day.name }, </span> }
              { performance.start_time } - { performance.end_time }
            </p>
            <div className="description" dangerouslySetInnerHTML={{ __html: performance.description }} />
          </div>
        </Link>
      </li>
    )

  }

}

export default Performance
