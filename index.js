const server = require('./server');

server.listen(process.env.PORT || 4000, ()=>{
    console.log(`listening on http://localhost:${process.env.PORT || 4000}`)
})
