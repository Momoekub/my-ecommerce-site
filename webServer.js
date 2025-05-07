const http = require ('http');
const url = require ('url');
const fs=require('fs');
const path =require('path')

const server = http.createServer(function (req, res) {
//var q = url.parse(req,url, true)
//var filename

let filepath = '.'+req.url;
if(filepath === "./") filepath ="./index.html"

const path = require('path');
const extname =path.extname(filepath);
let contentType="text.html";
if(extname === ".css")  contentType = "text/css";
if(extname === ".xml")  contentType = "text/xml";
if(extname === ".json")  contentType = "text/json";
if(extname === ".js")  contentType = "application/js";

    fs.readFile(filepath,function(err,htmlDoc){
        if(err){
            res.writeHead(200, {'Content-Type': 'text/html'});
            return res.end("404 File not found!!!!!!")
        }
        res.writeHead(200, {'Content-Type': contentType });
        var q=url.parse(req.url, true).query;
        var txt= q.fname+'  '+q.lname;
        res.write(htmlDoc);
        res.end();
    });
  
});

server.listen(8000);
