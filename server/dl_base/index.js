var Blog = require(path_root+"/model/model").Blog,
	Action = require(path_root+"/api/index"),
	fs = require("fs"),
	path = require("path"),
	util = require("util"),
	imgk = require('imagemagick'),
	uuid = require(path_root+"/api/uuid");
var async = require("async");
  	// render = require(path_root+"/base/api/render");
var blog = new Action(Blog);


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
