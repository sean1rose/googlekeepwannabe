
// necessary to fetch the collection-item id
var ObjectID = require('mongodb').ObjectID;


// routes are wrapped in a function, which takes the express app instance + db as args
module.exports = (app, db) => {
  
  // READ/GET/FIND SPECIFIC ROUTE...
    // https://expressjs.com/en/api.html#app.get.method
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    // ^ can't just do that to grab the id (as it's just a string); mongodb requires an ID OBJECT (ObjectID)

    // const details = { '_id': req.params.id };
    const details = { '_id': new ObjectID(id) };
    // ^ use instantiated ObjectID, pass in req.params.id
    
    // call mongodb-method FINDONE on db collection...
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred in ur get request foo'});
      } else {
        // return the fetched item in response...
        res.send(item);
      }
    });
  });
  

  // CREATE/POST ROUTE...
    // (req arg contains the parameters/JSON of the request) + (response  obj used to reply)
    // https://expressjs.com/en/api.html#app.post.method
  app.post('/notes', (req, res) => {
    console.log('req.body - ', req.body);
    const note = { text: req.body.body, title: req.body.title };
    // create note here...
    // mongodb-method INSERT posted note into collection...
    db.collection('notes').insert(note, (err, results) => {
      if (err) res.send({ 'error': 'an error occurred in ur post request foo' });
      res.send(results.ops[0]);
    });
  });


  // REMOVE/DELETE ROUTE...
    // Same as FIND, but then use remove instead of findOne...
    // https://expressjs.com/en/api.html#app.delete.method
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    // mongodb-method REMOVE
    db.collection('notes').remove(note, (err, item) => {
      if (err) res.send({ 'error': 'an error occurred in ur delete request foo'});
      res.send('note ' + id + ' deleted!');
    });
  });


  // UPDATE/PUT ROUTE
    // find + update
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    // mongodb-method update
    db.collection('notes').update(details, note, (err, result) => {
      if (err) res.send({'error': 'an error has occurred in ur put request foo'});
      res.send(note);
    })
  })

};