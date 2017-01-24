const express =       require('express');

// user to interact w/ mongodb db
const MongoClient =   require('mongodb').MongoClient;
const bodyParser =    require('body-parser');

// connect to mongodb (linked to user's db in mlab)
  // https://mlab.com/databases/googlekeepwannabe#users
  // config/db.js url
const db = require('./config/db');

// app is an instance of express
const app = express();

const port = 8000;

// allows Express to process URL encoded forms
app.use(bodyParser.urlencoded({ extended: true }));

// connect to our mongodb and wrap our app inside...
MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);

  // imports our routes (function), passing in express app and our db 
  require('./app/routes')(app, database);
  
  // specify a port to start listening for http requests
  app.listen(port, () => {
    console.log('Live and in color from ' + port);
  })
});


