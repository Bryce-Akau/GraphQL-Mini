const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 3050
const graphqlhttp = require('express-graphql')
const schema = require('./graphql/schema')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/graphql', graphqlhttp({
    schema: schema,
    graphiql: true,
}))
app.listen(PORT, () => console.log('Listening on Port: ' + PORT))