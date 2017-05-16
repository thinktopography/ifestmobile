import React from 'react'

class Commons extends React.Component {

  render() {
    return (
      <div className="list-container">
        <ul className="list">
          <li className="list-search">
            <input ref="searchField" type="text" placeholder="Search vendor name or category" />
          </li>
        </ul>
        <ul className="list">
        </ul>
      </div>
    )
  }

}

export default Commons
