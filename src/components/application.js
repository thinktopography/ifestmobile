import React from 'react'
import PropTypes from 'prop-types'
import Footer from './footer'
import Header from './header'

class Application extends React.Component {

  static childContextTypes = {
     header: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      header: {
        back: null,
        title: 'Mobile Schedule'
      }
    }
  }

  render() {
    const { children } = this.props
    const { header } = this.state
    return (
      <div className="application">
        <Header header={ header } />
        <div className="body">
          {children}
        </div>
        <Footer />
      </div>
    )
  }

  getChildContext() {
    return {
      header: {
        set: this._handleSet.bind(this)
      }
    }
  }

  _handleSet(header) {
    this.setState({ header })
  }

}

export default Application
