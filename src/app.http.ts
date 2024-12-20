import fs from 'fs';
import http from 'http';

const server = http.createServer((req, res)=>{

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

    const responseContent = fs.readFileSync(`./public/${req.url}`, 'utf8')
    res.end(responseContent)


})

server.listen(8080, ()=>{
    console.log('server is running on port 8080');
})