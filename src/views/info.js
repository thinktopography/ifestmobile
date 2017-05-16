import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import About from './about'
import Faq from './faq'
import Emergency from './emergency'

class Info extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  render() {

    const items = [
      { link: '/info', label: 'About', component: About },
      { link: '/info/faq', label: 'FAQ', component: Faq },
      { link: '/info/emergency', label: 'Emergency', component: Emergency }
    ]

    return (
      <div>
        <ul className="tabs">
          { items.map((item, index) => {
            return (
              <li key={`tab_${index}`}>
                <Route exact path={item.link} children={({ match }) => (
                  <Link to={item.link} className={match ? 'active' : ''}>
                    {item.label}
                  </Link>
                )}/>
              </li>
            )
          })}
        </ul>
        { items.map((item, index) => {
          return <Route exact path={ item.link } component={ item.component } key={`info_type_${index}`} />
        })}
      </div>
    )
  }

}

export default Info
