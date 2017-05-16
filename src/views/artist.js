import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'

class Artist extends React.Component {

  render() {
    const { artists } = this.props
    const { id } = this.props.match.params
    const artist = _.find(artists, { id: parseInt(id) })
    const { description, long_description, photo, stage, time, title } = artist
    const sponsorship = 'foo'
    const linkElement = 'foo'
    const day = moment(new Date(artist.day))
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
          <p>{description} {linkElement}</p>
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
          {sponsorship}
        </div>
      </div>    )
  }

}

const mapStateToProps = state => ({
  artists: state.data.performances
})

export default connect(mapStateToProps)(Artist)
