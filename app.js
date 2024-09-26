const http  = require("http")

const server =  http.createServer((req,res)=>{
        console.log("hello World")
})

server.listen(4000)