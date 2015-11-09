var Blog = require(path_root+"/model/model").Blog,
	Action = require(path_root+"/api/index"),
	showdown = require('showdown'),
	converter = new showdown.Converter();
    // markdown = require('markdown').markdown;
  	// render = require(path_root+"/base/api/render");
var blog = new Action(Blog);

exports.gettech = function(req,res){
	var obj = {
		page:req.param("page"),
		query:{type:req.param("type")}
	}
	if(req.param("subtype"))obj['subtype'] = req.param("subtype");
	if(req.param("tag"))obj['tag'] = req.param("tag");
	// blog.getAll(function(err,list){
	// 	res.send(list)
	// })
	console.log(obj)
	blog.getPageNationQueryList(obj,function(err,list,total){
		// console.log(err)
		// console.log(list)
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
	// console.log(req.body)
	// console.log("+++++++++++++")
	// console.log("_________________")
	// console.log("*********");
	// console.log(markdown)
	req.body.author = {name:'Chqiangs',_id:'chqiangs'};
	req.body.time = new Date();
	// req.body.content = markdown.toHTML(req.body.content);
	req.body.content = converter.makeHtml(req.body.content);
	var len=null,totext=null;
	if(req.body.subtype=="pic-word"){
		totext = true;
	}

	var arr = [],tags = req.body.tags;
	console.log(tags)
	if(typeof tags!="string"){
		for(var i=0;i<tags.length;i++){
			arr.push({label:tags[i]});
		}
		req.body.tags = arr;
	}
	
	req.body.summary = blog.cutword(req.body.content,len,totext);
	req.body.thumb = blog.cutimg(req.body.content);

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
