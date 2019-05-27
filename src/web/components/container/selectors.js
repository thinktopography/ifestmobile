import { createSelector } from 'reselect'
import _ from 'lodash'
import moment from 'moment'

const sort = (a,b) => {
  const [,a_start_hour,a_start_min,a_end_hour,a_end_min,a_apm] = a.time.match(/([\d]*):([\d]*)\s*-\s*([\d]*):([\d]*)\s*([APM]{2})/)
  const [,b_start_hour,b_start_min,b_end_hour,b_end_min,b_apm] = b.time.match(/([\d]*):([\d]*)\s*-\s*([\d]*):([\d]*)\s*([APM]{2})/)
  const a_day = (a_apm === 'AM' && a_start_hour === '12') ? '02' : '01'
  const b_day = (b_apm === 'AM' && b_start_hour === '12') ? '02' : '01'
  const a_start_mil_hour = (a_apm === 'PM' && parseInt(a_start_hour) !== 12) ? parseInt(a_start_hour) + 12 : a_start_hour
  const b_start_mil_hour = (b_apm === 'PM' && parseInt(b_start_hour) !== 12) ? parseInt(b_start_hour) + 12 : b_start_hour
  const a_time = moment(`2018-01-${a_day} ${a_start_mil_hour}:${a_start_min}`)
  const b_time = moment(`2018-01-${b_day} ${b_start_mil_hour}:${b_start_min}`)
  if(a_time.toDate() < b_time.toDate()) return -1
  if(a_time.toDate() > b_time.toDate()) return 1
  return 0
}

export const performancesSelector = (data, params) => data.performances

export const locationsSelector = (data, params) => data.locations

export const daysSelector = (data, params) => data.days

export const sponsorsSelector = (data, params) => data.sponsors

export const eventsSelector = (data, params) => data.special_events

export const idSelector = (data, params) => params.id

export const performanceSelector = createSelector(
  [performancesSelector, idSelector],
  (performances, id) => _.find(performances, { id: parseInt(id) })
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

    return Object.keys(performancesForDateByLocation).reduce((performances, location_id) => [
      ...performances,
      {
        location: _.find(locations, { id: parseInt(location_id) }),
        sponsors: _.filter(sponsors, { stage: parseInt(location_id), day: parseInt(day_id) }),
        performances: performancesForDateByLocation[location_id].sort(sort)
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
