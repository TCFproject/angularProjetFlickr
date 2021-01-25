var express = require("./FlickrPhotoSearchAPI/node_modules/express");
var mongo = require("./FlickrPhotoSearchAPI/node_modules/mongoose");
const LOCAL_DB = "mongodb://localhost:27017/flickr";

var db = mongo.connect(LOCAL_DB, (err) => {
  if (err) { console.log(err); }
  else { console.log('Connecté à mongodb localement.'); }
});

var app = express();
app.use((res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  next();
});
