import React from 'react'
import PropTypes from 'prop-types'

class Emergency extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  render() {
    return (
      <div className="about">
        <p className="lead text-center">
          In case of emergency call 911.
        </p>
        <p className="lead text-center">
          For minor medical needs, go to the EMS/Medical Tent at the intersection of Cayuga and Court Streets.
        </p>
        <p className="lead text-center">
          If you need other help ask any staff member.
        </p>
      </div>
    )
  }

  componentDidMount() {
    this.context.header.set({
      pageTitle: 'Emergency',
      title: 'Info',
      back: null
    })
    const ga = window.ga.getAll()[0]
    ga.set({
      page: '/info/emergency',
      title: 'Emergency'
    })
    ga.send('pageview')
  }

}

export default Emergency
