const express = require('express')
const app = express()
//Solution1: Install and Require Helmet
const helmet = require('helmet')

// //Solution2: Hide Potentially Dangerous Information Using helmet.hidePoweredBy()
// app.use(helmet.hidePoweredBy())

// //Solution3: Mitigate the Risk of Clickjacking with helmet.frameguard()
// app.use(helmet.frameguard({action: 'deny'}))

// //Solution4: Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter()
// app.use(helmet.xssFilter())

// //Solution5: Avoid Inferring the Response MIME Type with helmet.noSniff()
// app.use(helmet.noSniff())

// //Solution6: Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()
// app.use(helmet.ieNoOpen())

// //Solution7: Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts()
const timeInSeconds = 90 * 24 * 60 * 60
// app.use(helmet.hsts({maxAge: timeInSeconds, force: true}))

// //Solution8: Disable DNS Prefetching with helmet.dnsPrefetchControl()
// app.use(helmet.dnsPrefetchControl())

// //Solution9: Disable Client-Side Caching with helmet.noCache()
// app.use(helmet.noCache())

// //Solution10: Set a Content Security Policy with helmet.contentSecurityPolicy()
// app.use(helmet.contentSecurityPolicy({ directives: { 
//     defaultSrc: ["'self'"], scriptSrc: ["'self'", "trusted-cdn.com"] 
//   }} 
// ))

//Solution11: Configure Helmet Using the ‘parent’ helmet() Middleware
app.use(helmet({
  hidePoweredBy: true,
  frameguard: {action: 'deny'},
  xssFilter: true,
  noSniff: true,
  ieNoOpen: true, 
  hsts: {maxAge: timeInSeconds, force: true},
  dnsPrefetchControl: true,
  noCache: true,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  }
}))


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