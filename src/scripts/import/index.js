import request from 'request-promise'
import cheerio from 'cheerio'
import moment from 'moment'
import Excel from 'exceljs'
import path from 'path'
import _ from 'lodash'
import fs from 'fs'

const perform = async () => {
  const workbook = new Excel.Workbook()
  await workbook.xlsx.readFile(path.join(__dirname, 'data.xlsx'))
  const stages = getData(workbook, 'Stages')
  const sponsors = getData(workbook, 'Sponsors')
  const performances = getData(workbook, 'Performances')
  const food = getData(workbook, 'Food Vendor')
  const craft = getData(workbook, 'Craft Vendors')
  const commons = getData(workbook, 'Commons Vendors')
  const faq = getData(workbook, 'FAQ')
  const locations = stages.map((location, index) => ({
    id: index + 1,
    title: _.startCase(location.name)
  }))
  const days = [{
    id: 1,
    date: '2019-05-30',
    title: 'Thursday'
  },{
    id: 2,
    date: '2019-05-31',
    title: 'Friday'
  },{
    id: 3,
    date: '2019-06-01',
    title: 'Saturday'
  },{
    id: 4,
    date: '2019-06-02',
    title: 'Sunday'
  }]

  const getDayId = (title) => {
    const day = _.find(days, { title })
    return day.id
  }

  const getlocationId = (title) => {
    const location = _.find(locations, { title })
    return location ? location.id : null
  }

  const getPhoto = async (id, url) => {
    const data = await request(url, { encoding: null })
    const $ = cheerio.load(data.toString())
    const images = []
    $('img').map(function(i, el) {
      images.push(el.attribs.src)
    })
    const image = await request(images[0], { encoding: null })
    fs.writeFileSync(path.join('src','web','public','images','photos',`${id}.jpg`), image)
    return '/'+path.join('images','photos',`${id}.jpg`)
  }

  const data = {
    days: days.map(day => ({
      id: day.id,
      title: day.date
    })),
    locations,
    sponsors: sponsors.map(sponsor => ({
      name: sponsor.name,
      url: sponsor.url ? sponsor.url.hyperlink : null,
      stage_id: getlocationId(_.startCase(sponsor.stage)),
      day_id: getDayId(sponsor.day)
    })),
    food_vendors: food.map(vendor => ({
      title: _.startCase(vendor.name),
      category: _.startCase(vendor.category)
    })),
    craft_vendors: craft.map(vendor => ({
      title: _.startCase(vendor.name),
      category: _.startCase(vendor.category),
      description: vendor.description
    })),
    commons_vendors: commons.map(vendor => ({
      booth: vendor.booth,
      title: _.startCase(vendor.name)
    })),
    performances: await Promise.map(performances, async (performance, index) => ({
      id: index + 1,
      title: performance.name,
      description: toParagraph(performance.short_description),
      long_description: toParagraph(performance.description),
      url: performance.url ? performance.url.hyperlink : null,
      stage_id: getlocationId(_.startCase(performance.stage)),
      day_id: getDayId(performance.day),
      start_time: moment(performance.start_time).utc().format('hh:mm A'),
      end_time: moment(performance.end_time).utc().format('hh:mm A'),
      photo: performance.photo ? await getPhoto(index + 1, performance.photo.hyperlink) : null
    })),
    special_events: [],
    faq: faq.map(item => ({
      question: item.question,
      answer: toParagraph(item.answer)
    }))
  }
  fs.writeFileSync(path.join('src','web','public','static.json'), JSON.stringify(data, null, ' '))
}

const toParagraph = (content) => {
  if(!content) return undefined
  return `<p>${content.toString().replace(/\n/, '</p><p>')}</p>`
}

const getData = (workbook, sheet) => {
  const worksheet = workbook.getWorksheet(sheet)
  const data = []
  worksheet.eachRow((row, index) => {
    data.push(row.values.slice(1))
  })
  const headers = data[0].map(value => value.replace(' ', '_').toLowerCase())
  return data.slice(1).filter(data => {
    return data[0] && data[0].length > 0
  }).reduce((rows, data) => [
    ...rows,
    headers.reduce((row, header, index) => ({
      ...row,
      [header]: data[index]
    }), {})
  ], [])
}

perform().then(process.exit)
