const fs = require("fs")

const requestHandler = (req,res)=>{
    const url = req.url
    const method = req.method

    if(url === "/" && method ==="GET"){

            fs.readFile('./message.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error("Error reading file:", err);
                    return;
                }
                const text =  data.replaceAll("+"," ")
                res.setHeader("content-type","text/html")
                res.write("<html>")
                res.write("<head><title>Simple Form</title></head>")
                res.write("<body>")
                res.write(`<h3>${text}</h3>`)
                res.write("<form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Submit</button></form>")
                res.write("</body>")
                res.write("</html>")
                return res.end()
            });
        

            
        }else if( url === "/message" && method === "POST"){
                const body = []
                req.on("data",(chuck)=>{
                    body.push(chuck)
                })
                req.on("end",()=>{
                    const parsedBody = Buffer.concat(body).toString();
                    const message = parsedBody.split('=')[1];
                    fs.writeFile("message.txt",message,(err)=>{
                        if(err){
                            console.log("Error writeing the file:"+err)
                        }
                        res.statusCode = 302;
                        res.setHeader('Location', '/');
                        return res.end();
                    }) 
                    })
        }
}
// one -way

module.exports = requestHandler;

//module.export =  { handle: requestHandler , key :" some hard text"} or{function,function}

//second way of exporting

//module.export.handler = requestHandler
//module.export.text = "some hard text code"

//--------------------------------------

//third way of exporitng

//export.handler =  requestHandler
