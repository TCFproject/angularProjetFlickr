var express = require("./FlickrPhotoSearchAPI/node_modules/express");
var mongo = require("./FlickrPhotoSearchAPI/node_modules/mongoose");
const LOCAL_DB = "mongodb://localhost:27017/flickr";

var db = mongo.connect(LOCAL_DB, (err, res) => {
  if (err) { console.log(err); }
  else { console.log('Connected to local db.'); }
});

var app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  next();
});
