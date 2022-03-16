const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('database.json')
const middlewares = jsonServer.defaults()
const database = require('./database.json')

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    if (req.header('Authorization') == "token_1234") {
        res.json(database)
    } else {
        res.json({
            message: "Missing Token"
        })
    }
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})