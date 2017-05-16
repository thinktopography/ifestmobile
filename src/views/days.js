import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Days extends React.Component {

  static PropTypes = {
    days: PropTypes.array
  }

  render() {

    const { days } = this.props

    const sort = (a,b) => {
      if(a.id < b.id) return -1
      if(a.id > b.id) return 1
      return 0
    }

    return (
      <div className="date-tiles">
        { days.sort(sort).map((day, index) => {
          const timestamp = moment(new Date(`${day.title}, 2017`))
          return (
            <Link key={`day_${index}`} to={`/dates/${day.id}`} style={{ backgroundColor: day.color }}>
              <div className="date-headings-wrapper">
                <h3>{timestamp.format("MMM")}</h3>
                <h2>{timestamp.format("DD")}</h2>
                <h4>{timestamp.format("dddd")}</h4>
              </div>
            </Link>
          )
        }) }
      </div>
    )

  }

}

const mapStateToProps = state => ({
  days: state.data.days
})

export default connect(mapStateToProps)(Days)
