import { createSelector } from 'reselect'
import _ from 'lodash'
import moment from 'moment'

const sort = (a,b) => {
  const a_start = moment(`${a.day.title} ${a.start_time}`)
  const b_start = moment(`${b.day.title} ${b.start_time}`)
  if(a_start < b_start) return -1
  if(a_start > b_start) return 1
  return 0
}

export const performancesSelector = (data, params) => data.performances.filter(performance => {
  return performance.day_id !== null && performance.stage_id !== null
}).map(performance => {
  const stage = _.find(data.locations, { id: performance.stage_id })
  const day = _.find(data.days, { id: performance.day_id })
  day.name = moment(day.title).format('dddd')
  return {
    ...performance,
    stage,
    day
  }
})

export const locationsSelector = (data, params) => data.locations

export const daysSelector = (data, params) => data.days

export const sponsorsSelector = (data, params) => data.sponsors

export const eventsSelector = (data, params) => data.special_events

export const idSelector = (data, params) => params.id

export const performanceSelector = createSelector(
  [performancesSelector, daysSelector, locationsSelector, idSelector],
  (performances, days, locations, id) => {
    id = parseInt(id)
    const performance = _.find(performances, { id })
    return performance
  }
)

export const sponsorSelector = createSelector(
  [sponsorsSelector, performanceSelector],
  (sponsors, performance) => _.find(sponsors, { day: parseInt(performance.day_id), stage: parseInt(performance.stage_id) })
)

export const locationSelector = createSelector(
  [locationsSelector, idSelector],
  (locations, id) => _.find(locations, { id: parseInt(id) })
)

export const daySelector = createSelector(
  [daysSelector, idSelector],
  (days, id) => _.find(days, { id: parseInt(id) })
)

export const eventSelector = createSelector(
  [eventsSelector, idSelector],
  (events, id) => _.find(events, { id: parseInt(id) })
)

export const performancesByDateSelector = createSelector(
  [performancesSelector, locationsSelector, sponsorsSelector, idSelector],
  (performances, locations, sponsors, day_id) => {

    const performancesForDate = performances.filter(performance => {
      return performance.day_id == day_id
    })

    const performancesForDateByLocation = performancesForDate.reduce((performances, performance) => ({
      ...performances,
      [performance.stage_id]: [
        ...performances[performance.stage_id] || [],
        performance
      ]
    }), {})

    return Object.keys(performancesForDateByLocation).reduce((performances, stage_id) => [
      ...performances,
      {
        location: _.find(locations, { id: parseInt(stage_id) }),
        sponsors: _.filter(sponsors, { stage_id: parseInt(stage_id), day_id: parseInt(day_id) }),
        performances: performancesForDateByLocation[stage_id].sort(sort)
      }
    ], [])

  }
)

export const performancesByLocationSelector = createSelector(
  [performancesSelector, daysSelector, sponsorsSelector, idSelector],
  (performances, days, sponsors, location_id) => {

    const performancesForLocation = performances.filter(performance => {
      return performance.stage_id == location_id
    })

    const performancesForLocationByDate = performancesForLocation.reduce((performances, performance) => ({
      ...performances,
      [performance.day_id]: [
        ...performances[performance.day_id] || [],
        performance
      ]
    }), {})

    return Object.keys(performancesForLocationByDate).reduce((performances, day_id) => [
      ...performances,
      {
        day: _.find(days, { id: parseInt(day_id) }),
        sponsors: _.filter(sponsors, { stage: parseInt(location_id), day: parseInt(day_id) }),
        performances: performancesForLocationByDate[day_id].sort(sort)
      }
    ], {})

  }
)
