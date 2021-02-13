var express = require("./FlickrPhotoSearchAPI/node_modules/express");
var mongo = require("./FlickrPhotoSearchAPI/node_modules/mongoose");
var bodyParser = require("./FlickrPhotoSearchAPI/node_modules/body-parser"); 
var cors = require("./FlickrPhotoSearchAPI/node_modules/cors");
var app = express();
const PORT = 7000;
const LOCAL_DB = "mongodb://localhost:27017/appliFlickr";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

var imageSchema = mongo.Schema({
  tag: String,
  photos: { photo: {} }
});
var Image = mongo.model('Image', imageSchema, 'images');

var db = mongo.connect(LOCAL_DB, (err) => {
  if (err) { console.log(err); }
  else { console.log('Connecté à mongodb localement.'); }
});

app.get("/images", async (res) => {
  await Image.find((err, images) => {
    if (err) { console.log(err); }
    else { res.json(images); }
  });
});

app.get("/images/:tag", async (req, res) => {
  await Image.find({ tag: req.params.tag }, (err, images) => {
    if (err) { console.log(err); }
    else { res.json(images); }
  });
});

app.delete("/images/:tag", async (req, res) => {
  await Image.deleteOne({ tag: req.params.tag }, (err, images) => {
    if (err) { console.log(err); }
  });
});

app.post("/images", async (req, res) => {
  var image = new Image();
  image.tag = req.body.tag;
  image.photos.photo = req.body.photos;
  await image.save((err) => {
    if (err) { res.send(err); }
  })
});

app.listen(PORT);