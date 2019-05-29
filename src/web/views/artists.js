import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Performance from './performance'
import { performancesSelector } from '../components/container/selectors'

class Artists extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  static propTypes = {
    artists: PropTypes.array
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

    const performances = this.props.performances.slice().filter(filter).sort(sort)

    return (
      <div className="list-container">
        <ul className="list">
          <li className="list-search">
            <input ref={ node => this.input = node } type="text" placeholder="Search performers, genres, or locations" onChange={ this._handleChange.bind(this) } />
          </li>
        </ul>
        { performances.length > 0 &&
          <ul className="list">
            { performances.map((performance, index) => {
              return <Performance key={`performance_${index}`} day={ true } performance={ performance } to={`/artists/${performance.id}`} />
            }) }
          </ul>
        }
        { performances.length === 0 &&
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

const mapStateToProps = (state, props) => ({
  performances: performancesSelector(state.data, props)
})

export default connect(mapStateToProps)(Artists)
