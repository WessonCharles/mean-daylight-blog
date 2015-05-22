var Blog = require(path_root+"/base/model/model").Blog,
	Action = require(path_root+"/base/api/index");
  	// render = require(path_root+"/base/api/render");
var blog = new Action(Blog);

exports.gettech = function(req,res){
	console.log("*************")
 	// var render = render.create(req,res);
 	blog.getAll(function (err, blogs) {
 		if(err)console.dir(err);
 		console.log(" ___________________")
 		console.log(blogs)
 		console.log(" +++++++++++++++++++")
		res.send(blogs);
    });
}
exports.create = function(req,res){
	console.log(req.aparam["type"]);

}
