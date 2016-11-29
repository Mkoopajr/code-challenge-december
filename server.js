const http = require('http');
const fsStatic = require('node-static');

const files = new fsStatic.Server('./public');

const handleRequests = (req, res) => {

    if (req.method == 'GET') {
        files.serve(req, res);
    }
}

const server = http.createServer(handleRequests);

server.listen(8080, () => {
    console.log('Server running at localhost:8080');
});
