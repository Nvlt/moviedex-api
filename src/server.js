require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const movies = require('./movies');
const config = require('./config');

const app = express()

const morganOption = (process.env.NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(function authenticate(request, response, next)
{
    
    if(request.get('Authorization') === config.AUTH_KEY)
    {
        next();        
    }
    else
    {
        response.status(401).send("Access Denied.");
    }
})

function movieSearch(request, response)
{
    movies.getMovies(request,response);
}

app.get("/movie", movieSearch)

app.listen(config.PORT, ()=>{
    console.log(`listening on port ${config.PORT}`)
})
module.exports = app