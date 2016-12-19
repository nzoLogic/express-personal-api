// require express and other modules
var express = require('express'),
    app = express(),
    mongoose = require('mongoose');

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

// allow cross origin requests (optional)
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS//

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
        woopsIForgotToDocumentAllMyEndpoints: false,
        message: "Welcome to my personal api! Here's what you need to know!",
        documentationUrl: "https://github.com/nzoLogic/express-personal-api/blob/master/README.md",
        baseUrl: "https://steele-mongod.herokuapp.com/",
        endpoints: [{
                method: "GET",
                path: "/api",
                description: "Describes all available endpoints"
            }, {
                method: "GET",
                path: "/api/profile",
                description: "Contact information about me"
            }, // CHANGE ME
            {
                method: "GET",
                path: "/api/projects",
                description: "All projects I've included"
            }, {
                method: 'POST',
                path: '/api/projects',
                description: 'Adds a project (authentication required)'
            }, {
                method: 'GET',
                path: 'api/inspiration',
                description: 'routes to inspirational resources I use'
            }
        ]
    })
});

//get profile JSON
app.get('/api/profile', function(req, res) {
    res.json({
        name: 'Aaron',
        lastName: 'Steele',
        githubUsername: 'nzoLogic',
        githubLink: 'https://www.github.com/nzoLogic',
        githubProfileImage: 'https://avatars1.githubusercontent.com/u/22415969?v=3&u=51dca730705457fe7af713d23a5d5a5ef7c8b5d4&s=400',
        personalSiteLink: 'https://nzologic.github.io/',
        currentCity: 'San Francisco, CA',
        pets: false,
        quotes: ["My favorite things in life don't cost any money. It's really clear that the most precious resource we all have is time. -Steve Jobs",

            "No work or love will flourish out of guilt, fear, or hollowness of heart, just as no valid plans for the future can be made by those who have no capacity for living now. -Alan Watts",

            "Every human has four endowments - self awareness, conscience, independent will and creative imagination. These give us the ultimate human freedom... The power to choose, to respond, to change. -Stephen Covey",
        ]
    });
});
//gets all projects
app.get('/api/projects', function(req, res) {
    db.Project.find(function(err, project) {
        if (err) {
            console.log('error');
            res.status.send(404);
        }
        res.json(project);
    });
});
//get project by title
app.get('/api/projects/:title', function(req, res) {
    db.Project.findOne({
        title: req.params.title
    }, function(err, project) {
        if (err) {
            console.log(err);
        }
        res.json(project);
    });
});
//admin can add new projects
app.post('/api/projects', function(req, res) {
    var newProj = new db.Project(req.body);
    console.log(req.body);
    newProj.save(function(err, savedProj) {
        if (err) {
            console.log('errror');
            res.send(err);
        } else {
            res.json(savedProj);
        }
    });
    // res.json(newProj);
});
///updates project description must have title and description in body
app.patch('/api/projects/', function(req, res) {
    //find project by title
    console.log(req.body.title);
    db.Project.findOne({
        title: req.body.title
    }, function(err, project) {
        if (err) {
            console.log('error', err);
            res.status(500).send('error');
        } else {
            console.log(project);
            project.description = req.body.description;
            project.save();
            res.json(project);
        }
    });
});
//deletes a project by title paramater in body
app.delete('/api/projects/:title', function(req, res) {
    db.Project.findOneAndRemove({
        title: req.params.title
    }, function(err, proj) {
        if (err) {
            console.log('error on delete', err);
            res.status(500).send();
        } else {
            res.send(req.params.title + ' deleted');
        }
    });
});
/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is up and running on http://localhost:3000/');
});
