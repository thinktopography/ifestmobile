import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import Food from './food'
import Craft from './craft'
import Commons from './commons'

class Vendors extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  render() {

    const items = [
      { link: '/vendors', label: 'Food', component: Food },
      { link: '/vendors/craft', label: 'Craft', component: Craft },
      { link: '/vendors/commons', label: 'Commons', component: Commons }
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
          return <Route exact path={ item.link } component={ item.component } key={`vendor_type_${index}`} />
        })}
      </div>
    )
  }

}

export default Vendors
