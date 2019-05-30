import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Faq extends React.Component {

  static contextTypes = {
    header: PropTypes.object
  }

  render() {
    const { questions } = this.props
    return (
      <div className="faq">
        {questions.map((faq, index) => {
          return (
            <div key={`question_${index}`} className="question">
              <h2>Q: {faq.question}</h2>
              <div dangerouslySetInnerHTML={{__html: faq.answer}}/>
              <hr/>
            </div>
          )
        })}
      </div>
    )
  }

  componentDidMount() {
    this.context.header.set({
      pageTitle: 'FAQ',
      title: 'Info',
      back: null
    })
    const ga = window.ga.getAll()[0]
    ga.set({
      page: '/info/faq',
      title: 'FAQ'
    })
    ga.send('pageview')
  }

}

const mapStateToProps = (state, props) => ({
  questions: state.data.faq
})

export default connect(mapStateToProps)(Faq)
