var Blog = require(path_root+"/model/model").Blog,
	Action = require(path_root+"/api/index");
  	// render = require(path_root+"/base/api/render");
var blog = new Action(Blog);

exports.gettech = function(req,res){
	var obj = {
		page:req.param("page"),
		query:{type:req.param("type")}
	}
	if(req.param("subtype"))obj.query['subtype'] = req.param("subtype");
	// blog.getAll(function(err,list){
	// 	res.send(list)
	// })
	blog.getPageNationQueryList(obj,function(err,list,total){
		console.log(err)
		console.log(list)
		if(err)console.dir(err);
		var data = {
			message:{
				content:"查询成功",
				code:5
			},
			list:list,
			count:total
		}
		res.send(data);
	})
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
