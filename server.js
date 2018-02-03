const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const cors           = require('cors');
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
MongoClient.connect(db.url, (err, client) => {

    if (err) return console.log(err);
    require('./routes')(app, client.db('trello'));
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});