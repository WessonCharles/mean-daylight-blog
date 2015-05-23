var Blog = require(path_root+"/base/model/model").Blog,
	Action = require(path_root+"/base/api/index");
  	// render = require(path_root+"/base/api/render");
var blog = new Action(Blog);

exports.remove = function(req,res){
	var obj = {
		tags:[]
	}
	console.log(obj)
	blog.remove(obj,function(){
		res.send({message:{content:"删除成功",code:5}});
	})
	// blog.getPageNationQueryList(obj,function(err,list){
	// 	console.log(err)
	// 	console.log(list)
	// 	if(err)console.dir(err);
	// 	res.send(list);
	// })
}
