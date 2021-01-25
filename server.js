var express = require("./FlickrPhotoSearchAPI/node_modules/express");
var mongo = require("./FlickrPhotoSearchAPI/node_modules/mongoose");
var bodyParser = require("./FlickrPhotoSearchAPI/node_modules/body-parser"); 
var app = express();
const PORT = 7000;
const LOCAL_DB = "mongodb://localhost:27017";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var imageSchema = mongo.Schema({
  tag: String,
  url: String,
  auteur: String,
  titre: String,
  datepost: String
});
var Image = mongo.model('Image', imageSchema, 'images');

var db = mongo.connect(LOCAL_DB, (err) => {
  if (err) { console.log(err); }
  else { console.log('Connecté à mongodb localement.'); }
});

app.listen(PORT);
// app.use((res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//   next();
// });

app.get("/images", (req, res) => {
  Image.find((err, images) => {
    if (err) { console.log(err); }
    else { res.json(images); }
  });
});

app.get("/images/:tag", (req, res) => {
  Image.find({ tag: req.params.tag }, (err, images) => {
    if (err) { console.log(err); }
    else { res.json(images); }
  });
});

app.post("/images", (req, res) => {
  var image = new Image();
  image.tag = req.body.tag;
  image.url = req.body.url;
  image.auteur = req.body.auteur;
  image.titre = req.body.titre;
  image.datepost = req.body.datepost;
  image.save((err) => {
    if (err) { res.send(err); }
    else { res.send("Nouvelle image ajoutée à la base"); }
  })
});