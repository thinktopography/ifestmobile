import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from './actions'

class Container extends React.Component {

  static propTypes = {
    status: PropTypes.string,
    data: PropTypes.object,
    onLoadData: PropTypes.func
  }

  render() {
    const { children, data, status } = this.props
    if(status === 'success') return children
    return (
      <div className="splash">
        <img src="http://m.ithacafestival.org.s3.amazonaws.com/images/splash-screen.jpg" alt="Ithaca Festival Logo"/>
      </div>
    )
  }

  componentDidMount() {
    const { onLoadData } = this.props
    window.setTimeout(function() { onLoadData() }, 3000)
  }

}

const mapStateToProps = state => ({
  status: state.status,
  data: state.data
})

const mapDispatchToProps = {
  onLoadData: actions.loadData
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
