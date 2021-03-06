import * as actionTypes from './action_types'

export const loadData = () => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/static.json',
  query: { t: 201905300318 },
  request: actionTypes.LOAD_DATA_REQUEST,
  success: actionTypes.LOAD_DATA_SUCCESS,
  failure: actionTypes.LOAD_FATA_FAILURE
})
