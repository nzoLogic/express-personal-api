// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_project = {
  title: 'Illuminate',
  link: 'http://boxer-bridget-37502.bitballoon.com/',
  description: 'https://github.com/nzoLogic/Illuminate/blob/master/README.md',
  author: 'nzoLogic'
};
db.Project.remove({}, function(err, project){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all books');
}
});
db.Project.create(new_project, function(err, project){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new project", project);
  process.exit(); // we're all done! Exit the program.
});
