import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { performanceSelector, sponsorSelector } from '../components/container/selectors'

class Artist extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  render() {
    const { performance, sponsor } = this.props
    const { description, long_description, photo, stage, time, title } = performance
    const day = moment(new Date(performance.day))
    const styleProps = {
      backgroundImage: photo ? `url(${photo}?w=400?dpr=2)` : 'url(/images/logo.png)',
      backgroundPosition: 'center 33%',
      backgroundSize: 'cover'
    };

    return (
      <div className="performer">
        <div className="performer-image" style={styleProps} />
        <div className="performer-details">
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="performer-performance">
            <div className="performer-performance-date">
              <h4>{day.format('MMM')}</h4>
              <h3>{day.format('Do')}</h3>
            </div>
            <div className="performer-performance-details">
              {time}<br />
              {stage}
            </div>
          </div>
          <br />
          <p dangerouslySetInnerHTML={{__html: long_description}}/>
          { sponsor && sponsor.title }
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
    return `/artists`
  }

}

const mapStateToProps = (state, props) => ({
  performance: performanceSelector(state.data, props.match.params),
  sponsor: sponsorSelector(state.data, props.match.params)
})

export default connect(mapStateToProps)(Artist)
