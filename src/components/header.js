import React from 'react'
import { Route, Link } from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Mobile Schedule'
    };
  }

  render() {
    let title = this.state.title.toUpperCase();
    return (
      <div className="header">
        <h1><img src="./images/bannerlogo.png" /></h1>
        <h2 key={title}>{this.trimTitle(title)}</h2>
        <a href="http://ithacafestival.org" className="web" target="_blank"><i className="fa fa-external-link"></i>Full Site</a>
      </div>
    )
  }

  trimTitle(title) {
    return (title.length > 25) ? title.slice(0, 22) + '...' : title
  }

}

export default Header
