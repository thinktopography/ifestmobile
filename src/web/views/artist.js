import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { performanceSelector, sponsorSelector } from '../components/container/selectors'

class Artist extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  static propTypes = {
    match: PropTypes.object,
    performance: PropTypes.object,
    sponsor: PropTypes.object
  }

  render() {
    const { performance, sponsor } = this.props
    const { description, long_description, photo, stage, title, url } = performance
    const day = moment(performance.day.title)
    const styleProps = {
      backgroundColor: '#C32021',
      backgroundPosition: 'center 33%',
      backgroundImage: photo ? `url(${photo})` : 'url(/images/logo.png)',
      backgroundSize: 'cover'
    }
    return (
      <div className="performer">
        <div className="performer-image" style={styleProps} />
        <div className="performer-details">
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{__html: description}} />
          <div className="performer-performance">
            <div className="performer-performance-date">
              <h4>{day.format('MMM')}</h4>
              <h3>{day.format('Do')}</h3>
            </div>
            <div className="performer-performance-details">
              { performance.start_time } - { performance.end_time }<br />
              {stage.title}
            </div>
          </div>
          { sponsor &&
            <div className="performer-sponsor">
              <p>
                Sponsored by
                <a href={ sponsor.url }>{ sponsor.name }</a>
              </p>
            </div>
          }
          <div dangerouslySetInnerHTML={{__html: long_description}} />
          { url &&
            <a href={ url } target="_blank" className="performer-link">Visit performer website</a>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { params } = this.props.match
    this.context.header.set({
      title: 'Artist Profile',
      back: this._back(params)
    })
  }

  _back(params) {
    if(params.location_id) return `/locations/${params.location_id}`
    if(params.date_id) return `/dates/${params.date_id}`
    return '/artists'
  }

}

const mapStateToProps = (state, props) => ({
  performance: performanceSelector(state.data, props.match.params),
  sponsor: sponsorSelector(state.data, props.match.params)
})

export default connect(mapStateToProps)(Artist)
