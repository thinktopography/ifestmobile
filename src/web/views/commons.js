import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Commons extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  state = {
    q: ''
  }

  render() {

    const { q } = this.state

    const filter = (item) => (q === '' || item.name.toLowerCase().search(q.toLowerCase()) >= 0)

    const sort = (a,b) => {
      if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
      if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
      return 0
    }

    const vendors = this.props.vendors.slice().filter(filter).sort(sort)

    return (
      <div className="list-container">
        <ul className="list">
          <li className="list-search">
            <input ref={ node => this.input = node } type="text" placeholder="Search vendor name or category" onChange={ this._handleChange.bind(this) } />
          </li>
        </ul>
        { vendors.length > 0 &&
          <ul className="list">
            { vendors.map((vendor, index) => {
              return (
                <li key={`vendor_${index}`} className="list-item">
                  <div className="list-item-description">
                    <p className="time">{vendor.booth ? `Booth ${vendor.booth}` : ''}</p>
                    <h4>{vendor.name}</h4>
                    <p className="genre">{vendor.category}</p>
                  </div>
                </li>
              )
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

  _handleChange() {
    this.setState({
      q: this.input.value
    })
  }

}

const mapStateToProps = state => ({
  vendors: state.data.commons_vendors
})

export default connect(mapStateToProps)(Commons)
