var Blog = require(path_root+"/model/model").Blog,
	Action = require(path_root+"/api/index"),
	fs = require("fs"),
	path = require("path"),
	util = require("util"),
	imgk = require('imagemagick'),
	nodemailer = require('nodemailer'),
	uuid = require(path_root+"/api/uuid");
var async = require("async");
  	// render = require(path_root+"/base/api/render");
var blog = new Action(Blog);
var user = "603790089@qq.com";
var transport = nodemailer.createTransport("SMTP", {
      host: "smtp.qq.com"
    , secureConnection:true
    , port:465
    , auth: {
        user: user,
        pass: "huiqiang02101"//若要公开代码 ，则此处并不安全
    }
  });

exports.getall = function(req,res){
	var obj = {
		page:req.param("page"),
	}
	// blog.getAll(function(err,list){
	// 	res.send(list)
	// })
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
exports.getalltags = function(req,res){
	blog.getByQuery({type:"life"},{tags:1},{},function(err,doc){
		if(err)console.dir(err);
		var data = {
			message:{
				content:'查询成功',
				code:5,
			},
			tags:doc
		}
		res.send(data);
	})
}
exports.getquery = function(req,res){
	var type = req.param("type");
	var subtype = req.param("subtype");
	var ex = req.param("exclude");
	var tag = req.param("tag");

	var cond = {};
	var query;
	if(type){
		if(ex){
			cond = {type:type,subtype:{$ne:ex}};
		}else{
			cond = {type:type,subtype:subtype};
		}
		query = Blog.find(cond);
	}else{
		query = Blog.find({});
		query.where("tags",{$elemMatch:{'label':tag}});
	}
	query.exec(function(err,list){
		if(err)console.dir(err);
		var data = {
			message:{
				content:"查询成功",
				code:5
			},
			query:list
		}
		res.send(data);
	});

}
exports.getone = function(req,res){
	var id = req.param("id");
	blog.getById(id,function(err,one){
		if(err)console.dir(err);
		var data = {
			message:{
				content:'查询成功',
				code:5
			},
			blog:one,
			count:1
		}
		res.send(data);
	})
}
exports.postcomm=function(req,res){
	var id = req.body.id;
	var comment = req.body.comment;
	console.log(id)
	console.log(comment)
	// blog.getById(id,function(err,one){
	// 	if(err)console.dir(err);
	// 	if(!one.comments)
	// })
	async.waterfall([
        function(cb){
            blog.getById(id,function(err,one){
            	cb(err,one)
            })
        },
        function(one,cb){
        	console.log(one);
            if(!one.comments)one.comments = [];
            one.comments.push(comment);
    //         blog.update({_id:id},{$set:{"comments":one.comments}},function(err){
    //         	if(err)console.dir(err);
    //         	var data = {
				// 	message:{
				// 		content:'提交成功',
				// 		code:5
				// 	},
				// }
				// cb(err,data);
    //         })
            one.save(function(err){
            	if(err)console.dir(err);
            	var data = {
					message:{
						content:'提交成功',
						code:5
					},
				}
				cb(err,data);
            })
        }
    ],function(err,data){
    	console.log(data)
        err?callback(err,null,null):res.send(data);
    }) 
}
exports.remove = function(req,res){
	// var obj = {
	// 	tags:[]
	// }
	// console.log(obj)
	// blog.remove(obj,function(){
	// 	res.send({message:{content:"删除成功",code:5}});
	// })
	var id = req.param("_id");
	blog.remove({_id:id},function(err){
		if(err){console.log(err);
			res.send({message:"删除失败",code:-5});
		}else{
			res.send({message:"删除成功",code:5});
		}

	})
	// blog.getPageNationQueryList(obj,function(err,list){
	// 	console.log(err)
	// 	console.log(list)
	// 	if(err)console.dir(err);
	// 	res.send(list);
	// })
}

function createCode() {
  var code = "";
  var codeLength = 6;//验证码的长度  
  var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');//所有候选组成验证码的字符，当然也可以用中文的  
  
  for (var i = 0; i < codeLength; i++) {
    var charIndex = Math.floor(Math.random() * 36);
    code += selectChar[charIndex];
  }
  return code;
}

exports.sendcode = function(req,resp){
	var email = req.body.email;

	MailCode = createCode();
transport.sendMail({
    from    : 'Charles blog system<'+user+'>'
  , to      : '<'+email+'>'
  , subject : 'Charles博客管理员登陆验证码'
  , html    : '验证码为:['+MailCode+'] <br> '
}, function(err, res){
		var data = {
			message:{
				content:"",
				code:0,
			},
		}
		if(typeof res=="undefined"){
			console.log(err);
			data.message.content = "发送失败";
			data.message.code = -5;
			resp.send(data);
		}else{
			if(typeof callback == "function"){
				callback(err, res.message);
			}
		    if(err){
		        console.log(err);
		        data.message.content = "发送失败";
				data.message.code = -5;
				resp.send(data);
		    }else{
		        console.log("Message sent: " + res.message);
		        data.message.content = "发送成功";
				data.message.code = 5;
				resp.send(data);
		    }
		}
		
		
	});
}

exports.login = function(req,res){
	var e = req.body.email;
	var p = req.body.code;
	if(e=="chqiangs@gmail.com"&&p==MailCode){
		res.send({
			message:"登陆成功",
			code:5,
			userinfo:{"name":"chqiangs@gmail.com"}
		})
	}else{
		res.send({
			message:"登陆失败",
			code:-5
		})
	}
}

exports.imageupload = function(req,res){
	console.log("1")
	var file = "";
	if(req.param("type")&&req.param("type")=="swf"){
		file = req.files["Filedata"];
	}else{
		file = req.files["imgFile"];
	}
	console.log(req.files)
	console.log(req.body.imgFile)
	console.log(req.body)
	console.log(file)
	if(!file){
		res.end(JSON.stringify({error:1,message:"文件不能为空！"}));
		return ;
	}
	
	var upload_dir = req.body.upload_dir;
	if(!upload_dir){
		upload_dir = "";
	}else{
		upload_dir += "/";
	}
	
	var fileName = uuid.createUUID();
	if(file.originalname){
		//...filename
		var filenames = file.originalname.split(".");
		if(filenames.length > 0){
			fileName +="."+filenames.pop();
		}
	}
	
	var url = '/app/upload/'+upload_dir+ fileName;
	
	var path = upload_root + url;
	mk_dir(upload_root,'/app/upload/'+upload_dir);
	
	ins = fs.createReadStream(file.path);	
	ous = fs.createWriteStream(path);
	
	ins.pipe(ous);
	
	var rsdata = {
		error:0,
		url:url,
		name : file.originalname,//...filename
		size : file.size
	};
	console.log(rsdata)
	ins.on("end", function(err) {
		if(err) {
			console.log(err); 
			res.end(JSON.stringify({error:1,message:"上传失败！"}));
		} else {
			var filetype = file.name.split(".").pop();
			//bmp,jpg,tiff,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw
			if(filetype=="bmp"||filetype=="jpg"||filetype=="tiff"||filetype=="gif"||filetype=="pcx"||filetype=="tga"||
			   filetype=="exif"||filetype=="fpx"||filetype=="svg"||filetype=="psd"||filetype=="cdr"||filetype=="pcd"||
			   filetype=="dxf"||filetype=="ufo"||filetype=="eps"||filetype=="ai"||filetype=="raw"||filetype=="png"||filetype=="jpeg"||
			   filetype=="cgm"||filetype=="wmf"||filetype=="emf"||filetype=="pict"){
				
				imagePreview({
					path : url,
					size : 120
				},function(rs){
					rsdata.preview = rs.path || "";
					//res.end(JSON.stringify(rsdata));
					sendUpData(req,res,rsdata);
				});
			}else{
				sendUpData(req,res,rsdata);
			}
		}
	});
}

function sendUpData(req,res,rsdata){
	if(req.param("imgFileType")){
		res.end("<script>parent.Extend.cache.callback("+JSON.stringify(rsdata)+");</script>");
	}else if(req.param("callback")){
		res.end("<script>parent.Extend.handle."+req.param("callback")+"("+JSON.stringify(rsdata)+");</script>");
	}else{
		res.end(JSON.stringify(rsdata));
	}
}

var getAvatorPath = BaseApi.getAvatorPath = function(type,id,imgty){
	    if(!id){
	    	return ;
	    }
	    id = ""+ id;
	    if(!type){
	    	type = "tempiamges";
	    }
	    
	    if(!imgty){
	    	imgty = "png";
	    }
	   
	    //return[ "/upload",
	   
	   return[ /*file_url+*/"/upload",
	            type ,
	            id.substr(0,2),
	             id.substr(2,2),
	             id.substr(4,1),
	              id.substr(5,1),
	              id.substr(6)
	              ].join("/") +"."+imgty;
};

BaseApi.testAvatorPath = function(type,id,imgty){
	return BaseApi.getAvatorPath(type,id,imgty);
};

var getAvatorPath1 = BaseApi.getAvatorPath1 = function(type,id,imgty){
    if(!id){
    	return ;
    }
    id = ""+ id;
    if(!type){
    	type = "tempiamges";
    }
    
    if(!imgty){
    	imgty = "png";
    }
    
    return[ "/upload",
            type ,
            id.substr(0,2),
             id.substr(2,2),
             id.substr(4,1),
              id.substr(5,1),
              id.substr(6)
              ].join("/") +"."+imgty;
};

var mk_dir = BaseApi.mk_dir = function(root,path){
	if(!path)return;
	
	path = path.replace(/\\/g,"/");
	var dirs = path.split("/");
	
	var tpath = root;
	while(tpath && dirs.length >0){
		tpath = tpath + "/" + dirs.shift();
		//console.log(tpath);
		if(!fs.existsSync(tpath)){
			fs.mkdirSync(tpath);
		}
	}
};

var imagePreview = exports.imagePreview = function(param,callback){
	//var filenames = param.path.split(".");
	var destPath = "/upload/previews/"+uuid.createUUID()+".png";
	var preParam =   [upload_root+param.path, '-sample',
	   	     		Math.round(param.width || param.size || 100) 
	   	     		+'x'+Math.round(param.height || param.size || 100)
	   	     		, upload_root+destPath];
	imgk.convert(preParam,function(err, stdout, stderr){
		 if(err){
    		 console.dir(err);
    		 callback({code:-1,message:"error"});
    	 }else{
    		 callback({code:1,path:destPath});
    	 }
	});
};


exports.imagecrop = function(req,res){
    var id = req.param("_id");
    if(id=="circleavator"){
    	id = uuid.createUUID();
    }
    var type = req.param("type");
    if(!type) type = "tempimages";
	var pos = JSON.parse(req.param("pos"));

    var desPath;
    
    if(id=="undefined"){
    	//desPath = req.param("path").replace("tempimages",req.param("type"));
    	desPath = req.param("path");
    }else{
    	desPath = getAvatorPath(type,id);
    } 
  
    if(req.param("zoom") && req.param("zoom") != 1){
    	pos.x = parseInt(pos.x/req.param("zoom"));
    	pos.y = parseInt(pos.y/req.param("zoom"));
    	pos.w = parseInt(pos.w/req.param("zoom"));
    	pos.h = parseInt(pos.h/req.param("zoom"));
    }
    	console.log(pos+"__"+typeof pos)
    	console.log(pos.w+"__"+typeof pos.w)
    	console.log(pos.h+"__"+typeof pos.h)
    	console.log(pos.x+"__"+typeof pos.x)
    	console.log(pos.y+"__"+typeof pos.y)
	  var cropParam =   [upload_root+req.param("path"), '-crop',
	     		Math.round(parseInt(pos.w)) +'x'+Math.round(parseInt(pos.h))
	     		+"+"+Math.round(parseInt(pos.x)) +'+'+Math.round(parseInt(pos.y))
	     		, upload_root+desPath];
	 
	  var width = req.param("width");
	  var height =  req.param("height");
	  if(!width && req.param("size")){
		  width = req.param("size");
	  }
	  if(!height && req.param("size")){
		  height = req.param("size");
	  }
	  
	  var reParam = "100x100";
	  if(!height && width){
		  reParam = ""+Math.round(width);
	  }else if(height && !width){
		  reParam = "x"+Math.round(height);
	  }else if(height && width){
		  reParam = Math.round(width)+"x"+Math.round(height);
	  }
	  
	  var resizeParam;
	  
		  if(req.param("size") && (Math.round( pos.w)  != Math.round( pos.h) ||  Math.round( pos.h)  !=Math.round(req.param("size")))){
			  resizeParam =   [upload_root+desPath, '-resize',
									reParam,
									upload_root+desPath];
		  }else{
			   resizeParam = false;
		  }	
	  
	 
	  console.log(cropParam)
	    mk_dir(upload_root,path.dirname(desPath));
	    console.log(resizeParam)

	     imgk.convert(cropParam,function(err, stdout, stderr){
	    	 if(err){
	    	 	 console.log("this")
	    		 console.dir(err);
	    		
				 res.end("Extend.cropcallback ("+JSON.stringify({code:-1,message:"error"})+");");
	    		
	    	 }else{
				
				 desPath = /*file_url+*/desPath;//9号
				
	    		 // if(resizeParam){
		    		// 	 imgk.convert(resizeParam, function(err, stdout, stderr){
			    	// 			if(err){
			    	// 				console.log("that")
			    	// 				 console.dir(err);
			    					
								// 	 res.end("Extend.cropcallback("+JSON.stringify({code:-1,message:"error"})+");");
			    		    		 
			    	// 			}else{
			    	// 				res.end("Extend.cropcallback("+JSON.stringify({code:1,data:{src:desPath}})+");");
			    	// 			}
			    	// 		});
	    		 // }else{
					 res.end("Extend.cropcallback("+JSON.stringify({code:1,data:{src:desPath}})+");");
	    		 // } 		 
	    	 }
	    	 
	     });
}
