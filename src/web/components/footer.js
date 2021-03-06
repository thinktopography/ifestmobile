import React from 'react'
import { Route, Link } from 'react-router-dom'

class Footer extends React.Component {

  render() {

    const { match } = this.props

    const items = [
      { link: '/days', icon: 'clock-o', label: 'Days' },
      { link: '/stages', icon: 'map-marker', label: 'Stages' },
      { link: '/artists/', icon: 'headphones', label: 'Artists' },
      { link: '/map', icon: 'globe', label: 'Maps' },
      // { link: '/events', icon: 'calendar', label: 'Events' },
      { link: '/vendors', icon: 'user', label: 'Vendors' },
      { link: '/info', icon: 'info-circle', label: 'Info' }
    ]

    return (
      <div className="footer">
        { items.map((item, index) => (
          <div className="footer-item" key={`tab_${index}`}>
            <Route path={item.link} children={({ match }) => (
              <Link to={item.link} className={match ? 'active' : ''}>
                <i className={`fa fa-${item.icon}`}></i>
                {item.label}
              </Link>
            )}/>
          </div>
        ))}
      </div>
    )
  }
}

export default Footer
