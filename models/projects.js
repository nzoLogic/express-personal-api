var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ProjectSchema= new Schema({
  title: String,
  author: String,
  description: String,
  link: String,
});

var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
