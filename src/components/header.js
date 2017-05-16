import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'

class Header extends React.Component {

  static propTypes = {
    header: PropTypes.Object
  }

  render() {
    const { back, title } = this.props.header
    return (
      <div className="header">
        { back &&
          <Link to={ back } className="back">
            <i className="fa fa-chevron-left"></i>
          </Link>
        }
        <h1><img src="/images/bannerlogo.png" /></h1>
        <h2 key={ title }>{ this.trimTitle(title) }</h2>
        <a href="http://ithacafestival.org" className="web"><i className="fa fa-external-link"></i>Full Site</a>
      </div>
    )
  }

  trimTitle(title) {
    return (title.length > 25) ? title.slice(0, 22) + '...' : title
  }

}

export default Header
