import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Food extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  render() {
    const { vendors } = this.props
    return (
      <div className="list-container">
        <ul className="list">
          <li className="list-search">
            <input ref="searchField" type="text" placeholder="Search vendor name or cuisine" />
          </li>
        </ul>
        { vendors.length > 0 &&
          <ul className="list">
            {vendors.sort(sort).map((vendor, index) => {
              return <div>Vendor</div>
            })}
          </ul>
        }
        { vendors.length === 0 &&
          <div className="empty-results-container">
            <h3 className="text-muted">
              No Results.<br/>
              <small>Try another search, they're plenty fast!</small>
            </h3>
          </div>
        }
      </div>
    )
  }

}

const mapStateToProps = state => ({
  vendors: state.data.food_vendors
})

export default connect(mapStateToProps)(Food)
