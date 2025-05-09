const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser')

const app = express();
const port=4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/subject', require ('./routes/subject'));
app.use('/api/contact', require ('./routes/contact'));


app.listen(port,() => {
    console.log('server running at http://localhost:'+port)

});
