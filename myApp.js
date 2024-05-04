const express = require('express')
const app = express()
//Solution1: Install and Require Helmet
const helmet = require('helmet')

//Solution2: Hide Potentially Dangerous Information Using helmet.hidePoweredBy()
app.use(helmet.hidePoweredBy())

//Solution3: Mitigate the Risk of Clickjacking with helmet.frameguard()
app.use(helmet.frameguard({action: 'deny'}))

//Solution4: Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter()
app.use(helmet.xssFilter())


module.exports = app

const api = require('./server.js')
app.use(express.static('public'))
app.disable('strict-transport-security')
app.use('/_api', api)
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html')
})
let port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`)
})