import PropTypes from 'prop-types'
import Footer from './footer'
import Header from './header'
import React from 'react'

class Application extends React.Component {

  static childContextTypes = {
    header: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      header: {
        back: null,
        pageTitle: 'Mobile Schedule',
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
          { children }
        </div>
        <Footer />
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { header } = this.state
    if(header.pageTitle !== prevState.header.pageTitle) {
      document.getElementsByTagName('title')[0].text = header.pageTitle
    }
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
