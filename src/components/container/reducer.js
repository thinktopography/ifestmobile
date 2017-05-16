import * as actionTypes from './action_types'
import _ from 'lodash'

const INITIAL_STATE = {
  status: 'pending',
  data: {}
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.LOAD_DATA_SUCCESS:
    return {
      status: 'success',
      data: action.result
    }

  case actionTypes.LOAD_DATA_FAILURE:
    return {
      status: 'failure'
    }

  default:
    return state
  }

}
