const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const config = require('./config');

const boardRouter = require('./boardRouter');
const textRouter = require('./textRouter');

app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send('Welcome to my virtual board');
});

app.use('/board', boardRouter);
app.use('/text', textRouter);

app.listen(port, function(err) {
    if(err) {
        console.log('Problem');
    }
    console.log('Server is listening at port ', config.PORT);
});
