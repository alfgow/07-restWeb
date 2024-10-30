import fs from 'fs';
import http2 from 'http2';

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
},(req, res)=>{

    console.log(req.url);

    // res.writeHead(200, {'Content-Type':'text/html'})
    // res.write(`<h1>Hello alfgow, u're at ${req.url}</h1>`)
    // res.end()

    // const data = {name:'alfgow', age:20, gender:'male'}
    // res.writeHead(200, {'Content-Type':'application/json'})
    // res.end(JSON.stringify(data))

    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf8')
        res.writeHead(200, {'Content-Type':'text/html'})
        res.end(htmlFile)
        return
    } 

    if (req.url?.endsWith('.js')) {
        res.writeHead(200,{'Content-Type':'application/javascript'})       
    }

    if(req.url?.endsWith('.css')) {
        res.writeHead(200,{'Content-Type':'text/css'})
    }

    try {
        const responseContent = fs.readFileSync(`./public/${req.url}`, 'utf8')
        res.end(responseContent)
    } catch (error) {
        res.writeHead(404, {'Content-Type':'text/html'})
        res.end(`<h1>404 Not Found</h1>`)
    }

})

server.listen(8080, ()=>{
    console.log('server is running on port 8080');
})