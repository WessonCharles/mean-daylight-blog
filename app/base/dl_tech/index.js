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
	console.log(req.body)
	console.log("+++++++++++++")
	console.log("_________________")
	console.log("*********")
	req.body.author = {name:'Chqiangs',_id:'chqiangs'};
	req.body.time = new Date();
	blog.create(req.body,function(blog){
		var data = {
			message:{
				"content":"添加博客成功",
				"code":5
			},
			tech:blog
		}
		res.send(data);
	})	

}
