const http = require("http")
const fs = require("fs")

const server =  http.createServer((req,res)=>{

    const text = fs.readFile('./message.txt', 'utf8',()=>{});

    const url = req.url
    const method =  req.method

    res.setHeader("content-type","text/html")

    res.write("<html>")
    res.write("<head><title>Simple Form</title></head>")
    res.write("<body>")
    res.write(`<h3>${text}</h3>`)
    res.write("<form action='/' method='POST'><input type='text' name='message'><button type='submit'>Submit</button></form>")
    res.write("</body>")
    res.write("</html>")
   

        if(url === "/" && method === "POST"){
            const body = []
            req.on("data",(chuck)=>{
                 body.push(chuck)
            })
            return  req.on("end",()=>{
                    const parsedBody = Buffer.concat(body).toString();
                     const message = parsedBody.split('=')[1];
                     fs.writeFile("message.txt",message,()=>{
                        res.statusCode = 302;
                        return res.end();
                     })
                        
                        
                })
        }

        res.end()
    

})


server.listen(4000)