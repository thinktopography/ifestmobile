import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Commons extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  static propTypes = {
    vendors: PropTypes.array
  }

  state = {
    q: ''
  }

  render() {

    const { q } = this.state

    const filter = (item) => (q === '' || item.title.toLowerCase().search(q.toLowerCase()) >= 0)

    const sort = (a,b) => {
      if(a.title.toLowerCase() < b.title.toLowerCase()) return -1
      if(a.title.toLowerCase() > b.title.toLowerCase()) return 1
      return 0
    }

    const vendors = this.props.vendors.slice().filter(filter).sort(sort)

    return (
      <div className="list-container">
        <div className="list-search">
          <input ref={ node => this.input = node } type="text" placeholder="Search vendor name" onChange={ this._handleChange.bind(this) } />
        </div>
        <div className="list">
          { vendors.length > 0 &&
            <ul>
              { vendors.map((vendor, index) => {
                return (
                  <li key={`vendor_${index}`} className="list-item">
                    <div className="list-item-description">
                      <p className="time">{vendor.booth ? `Booth ${vendor.booth}` : ''}</p>
                      <h4>{vendor.title}</h4>
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
                <small>Try another search</small>
              </h3>
            </div>
          }
        </div>
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
