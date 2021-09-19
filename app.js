// content of index.js
const http = require('http')
const https = require('https')
const qs = require('querystring');
const port = 3000

const requestHandler = (request, response) => {
    var requestBody = '';
    request.on('data', function (data) {
        requestBody += data;
        if (requestBody.length > 1e7) {
            response.writeHead(413, 'Request Entity Too Large', { 'Content-Type': 'text/html' });
            response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
        }
    });
    request.on('end', function () {
        var formData = qs.parse(requestBody);

        const data = JSON.stringify({
            value1: formData.mass,
            value2: formData.date,
        })

        const options = {
            hostname: 'maker.ifttt.com',
            port: 443,
            path: `/trigger/${process.env.APPLET_NAME}/with/key/${process.env.API_KEY}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }
        
        const req = https.request(options, res => {
            res.on('data', d => {
                process.stdout.write(d + '\n' + options  + '\n')
            })
        })
        
        req.on('error', error => {
            console.error(error)
        })
        
        req.write(data)
        req.end()
        response.end();
    });
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
})