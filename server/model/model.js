var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var comment = new Schema({
	user_id:String,
	user_name:String,
	ref:String,
	time : Date,
	content : String
});


var blogSchema = new Schema({
	//文章标题
    title : String,
    //标签
    tags:[],
    //作者
	author : {nickname:String,_id:String},
	//日志内容
	content : String,
	//创建日期
	time : Date,
	//分类
	type : String,
	//if type==life
	subtype:String,
	//评论列表
	comments:[comment],
	//点击喜欢量（赞）
	ctr : Number,
	//是否原创
	ismine:Boolean,
	//原作者
	originalauthor : {name:String,_id:String,url:String},
	//缩略图
	thumb:String,
	//简介
	summary:String,

});

blogSchema.index({"author._id":1});
blogSchema.index({time:-1});
var Blog = BaseApi.Blog =  exports.Blog = mongoose.model("Blog",blogSchema,"blog");

// BaseApi.mongoEvent.on("update#user.nickname",function(d){
// 	Blog.update({"author._id":d._id},{"author.nickname":d.nickname},{multi:true},function(){});
// 	Blog.update({"creator._id":d._id},{"author.nickname":d.nickname},{multi:true},function(){});
// 	Blog.update({"comments.user_id":d._id},{"comments.$.user_name":d.nickname},{multi:true},function(){});
// });

// BaseApi.mongoEvent.on("update#project.name",function(d){
// 	Blog.update({"project._id":d._id},{"project.name":d.name},{multi:true},function(){});
// });

// BaseApi.mongoEvent.on("update#team.name",function(d){
// 	//console.dir(d);
// 	Blog.update({"team._id":d._id},{"team.name":d.name},{multi:true},function(){});
// });

