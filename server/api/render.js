var ejs = require("./ejsrender");
var statics = require("./static");

exports.create = function(req,res,path){
	return new Render(req,res,path);
};

exports.sendStatic = statics.writeFile;

//function 

function Render(req,res,path){
	this.context = {req:req,res:res};
	this.req = req;
	this.res = res;
	if(path){
		this.ejs = ejs.create(path);
	}
}

Render.prototype = {
	getParam : function(pname){
		return this.req.aparam[pname] || this.req.params[pname] || null;
	},
	
	setView : function(path,pname,rname){
		//console.log(path);
		if(path){
			this.ejs = ejs.create(path);
		}
		if(pname&&rname){
			this.context[pname] = rname;
		}
	},
	
	autoLogin : function(callback){
		var self_ = this;
		if(!this.req.session["user"] && this.req.cookies["login-user"]){
			BaseApi.findUser({email:self_.req.cookies["login-user"]},function(err,doc){
				if(!err && doc){
					BaseApi.UserInfo.findOne({user_id:doc._id},function(err1,doc1){
						if(!err1 && doc1){
							self_.setSession("user",doc);
							self_.setSession("userinfo",doc1);
						}
						callback();
					});
					
				}			
				callback();
			});
		}else{
			callback();
		}
	},
	
	testView : function(){
		if(this.ejs) return true;
		return false;		
	},
	
	getSession : function(sname){
		return this.req.session[sname] || (sname == "user" ? {_id:"none"} :  null);
	},
	
	setSession : function(sname,svalue){
		this.req.session[sname] = svalue;
	},
	
	setContext : function(key,value){
		this.context[key] = value;
	},
	
	getContext : function(key){
		return this.context[key];
	},
	
	testContext : function(key){
		return typeof this.context[key] != "undefined";
	},
	
	end : function(text){
		if(text && typeof text != "string"){
			this.json(text);
		}else{
			this.res.end(text);
		}		
	},
	
	output : function(callback){
		var self_ = this,context = this.context;
		this.ejs.compile(function(render){
			if(self_._handleError(render.error,callback)) return ;
			try{
				callback(null,render.compiler(context));
			}catch(e){
				self_._handleError(e,callback);
			}
		});
	},
	
	write : function(text){
		this.res.write(text);		
	},
	
	json : function(obj,keep){
		if(keep){
			this.res.write(JSON.stringify(obj));
		}else{
			this.res.end(JSON.stringify(obj));
		}
	},
	
	_handleError : function(error,callback){
		if(error){
			if(typeof callback == "function"){
				callback(error);
			}else{
				console.log(error);
				this.res.end("Error");
			}
				
			return true;
		}
		return false;
	},
	
	send : function(callback){
		var self_ = this,context = this.context;
		if(!this.ejs) {
			self_.res.end("no page");
			return ;
		}
		
		this.ejs.compile(function(render){
			if(self_._handleError(render.error,callback)) return ;
			try{
				self_.res.end(render.compiler(context));
			}catch(e){
				self_._handleError(e,callback);
			}
		});
	},
	
	sendWhen : function(cond,callback){
		if(typeof cond && !cond(this.context)) return ;
		this.send(callback);
	},
	
	renderDoc : function(query,callback){
		var self_ = this,context = this.context;
		this.ejs.compile(function(render){
			if(self_._handleError(render.error,callback)) return ;
			query.findOne(function(err,doc){
				if(self_._handleError(err,callback)) return ;
				context[query.model.modelName] = doc;
				self_.res.end(render.compiler(context));	
			});
		});
	},
	
	renderList : function(query,callback){
		var self_ = this,context = this.context;
		this.ejs.compile(function(render){
			if(self_._handleError(render.error,callback)) return ;
			query.find(function(err,docs){
				if(self_._handleError(err,callback)) return ;
				docs.each(function(doc){
					if(!doc) {
						return ;
					}
					context[query.model.modelName] = doc;
					self_.res.write(render.compiler(context));
					self_.res.write("\n");
				});
				
				callback();
				/*
				if(typeof callback == "function"){
					callback();
				}else{
					self_.res.end("");
				}
				*/
			});
		});
	},
	
	testId :function(str){
		return str && str.length==24 && /[0-9a-eA-E]/.test(str);
	}
};