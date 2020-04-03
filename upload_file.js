var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');

http.createServer(function (req, res) {

    // Send form upload
    if (req.url === "/" && req.method === "GET") {
        fs.readFile("form_upload.html", (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            if (err) throw err;
            res.end(data);
        });
    }

    // Upload the file
    if (req.url == '/' && req.method === "POST") {
        // Create object form from formidable
        var form = new formidable.IncomingForm();

        // Handle the file upload
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = __dirname + "/uploads/" + files.filetoupload.name;

            // Move the uploaded file
            mv(oldpath, newpath, function (err) {
                if (err) { throw (err) }
                console.log('File upload successfully');
                return res.end('File uploaded successfully');
            })
        })
    }
}).listen(8000);

console.log("Server listenig on http://localhost:8000");