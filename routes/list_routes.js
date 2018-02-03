// note_routes.js
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/lists', (req, res) => {
        db.collection('lists').find().toArray(function(e, d) {
            res.setHeader('Access-Control-Allow-Origin', '*');

            res.send(d)
        });
    });

    app.get('/lists/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('lists').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });

    });

    app.delete('/lists/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('lists').remove(details, (err, item) => {
            if (err) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send({'error':'An error has occurred'});
            } else {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    app.put ('/lists/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { cardsArray: req.body.cardsArray, title: req.body.title };
        db.collection('lists').update(details, note, (err, result) => {
            if (err) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send({'error':'An error has occurred'});
            } else {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(note);
            }
        });
    });


    app.post('/lists', (req, res) => {

        const list = { cardsArray: req.body.cardsArray, title: req.body.title };
        db.collection('lists').insert(list, (err, result) => {
            if (err) {
                res.send({ 'error': err });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};