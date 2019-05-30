import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Performance from './performance'
import { performancesSelector } from '../components/container/selectors'
import _ from 'lodash'

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

  _handleChange = this._handleChange.bind(this)
  _handleEvent = _.debounce(this._handleEvent.bind(this), 400, { trailing: true })

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
        <div className="list-search">
          <input ref={ node => this.input = node } type="text" placeholder="Search performers, genres, or locations" onChange={ this._handleChange } />
        </div>
        <div className="list">
          { performances.length > 0 &&
            <ul>
              { performances.map((performance, index) => {
                return <Performance key={`performance_${index}`} day={ true } performance={ performance } to={`/artists/${performance.id}`} />
              }) }
            </ul>
          }
          { performances.length === 0 &&
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

  componentDidMount() {
    this.context.header.set({
      pageTitle: 'Artists',
      title: 'Mobile Schedule',
      back: null
    })
    const ga = window.ga.getAll()[0]
    ga.set({
      page: '/artists',
      title: 'Artists'
    })
    ga.send('pageview')
  }

  _handleChange() {
    this.setState({
      q: this.input.value
    })
    this._handleEvent()
  }

  _handleEvent() {
    const ga = window.ga.getAll()[0]
    ga.send('event', 'artists', 'search', this.input.value)
  }

}

const mapStateToProps = (state, props) => ({
  performances: performancesSelector(state.data, props)
})

export default connect(mapStateToProps)(Artists)
