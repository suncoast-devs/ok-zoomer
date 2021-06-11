const got = require('got')

const ZOOM_API_TOKEN = process.env.ZOOM_API_TOKEN
const ZOOM_API_URL = 'https://api.zoom.us/v2/'
const ZOOM_ADMIN_ID = 'Xa3hbFk2Q4W8DrU1K_Pf_A'

const zoomClient = got.extend({
  prefixUrl: ZOOM_API_URL,
  headers: {
    Authorization: `Bearer ${ZOOM_API_TOKEN}`,
  },
})

function scheduleMeeting(topic, startTime, duration) {
  return zoomClient
    .post(`users/${ZOOM_ADMIN_ID}/meetings`, {
      json: {
        topic,
        start_time: startTime,
        duration,
        settings: {
          join_before_host: true,
          jbh_time: 10,
          audio: 'voip',
        },
      },
    })
    .json()
}

exports.handler = async function (event) {
  const { topic, startTime, duration } = JSON.parse(event.body)
  return {
    statusCode: 200,
    body: JSON.stringify(await scheduleMeeting(topic, startTime, duration)),
  }
}
