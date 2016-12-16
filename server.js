// require express and other modules
var express = require('express'),
    app = express(),
    mongoose = require('mongoose');

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

//hardcoded profile


// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/nzoLogic/express-personal-api/blob/master/README.md", // CHANGE ME
    baseUrl: "https://steele-mongod.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Contact information about me"}, // CHANGE ME
      {method: "POST", path: "/api/projects", description: "All projects I've included"}
       // CHANGE ME
    ]
  })
});

//get profile JSON
app.get('/api/profile', function(req, res){
  res.json({name: 'Aaron',
  githubUserName: 'nzoLogic',
  githubProfileImage: 'https://avatars3.githubusercontent.com/u/22415969?v=3&s=400',
  personalSite : 'https://nzologic.github.io/',
  currentCity: 'San Francisco, CA',
  pets: false
});
});
//gets all projects
app.get('/api/projects', function(req, res){
  db.Project.find(function(err, project){
    if(err){
      console.log('error');
      res.status(404);
    }
  res.json(project);
});
});
//get project by title
app.get('api/projects:title', function(req, res){
  db.Project.findOne({title: req.params.title}, function(err, project){
    if(err){
      console.log(err);
    }
    res.json(project);
  });
});
/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
