
var ejs = require('ejs')
  , fs = require('fs'); 
 
ejs.homeBase = path_root;

var compilerCache = {};

function Ejs(filename,template){
	this.complate = false;
	this.filename = filename;
	this.template = template;
	if(use_cache && filename){
		this.compiler = compilerCache[filename];
	}
}

Ejs.prototype = {
	compile : function(callback){
		if(this.compiler){
			if(typeof callback == "function"){
				callback(this);
			}else{
				return this.compiler;
			}
		}else{
			if(typeof callback == "function"){
				this.createCompiler(callback);
			}else{
				return this.createCompilerSync();
			}
		}
	},
	
	createCompilerSync : function(){
		var self_ = this;	
		try{
			if(this.template && this.template.length>0){
				self_.compiler = ejs.compile(self_.template,{filename : self_.filename});
				if(self_.filename){
					compilerCache[self_.filename] = self_.compiler;
				}		
			}else if(this.filename){
				var fcontent = fs.readFileSync(this.filename, 'utf8');
				if(!fcontent){
					self_.error = new Error("no template!");	
				}else{
					self_.compiler = ejs.compile(fcontent,{filename : self_.filename});
					compilerCache[self_.filename] = self_.compiler;
					self_.complate = true;
				}
				return self_.compiler;
			}else{
				this.error = new Error("no template!");					
			}
			this.complate = true;	
		}catch(e){
			this.error = new Error(e);
		}
		
		return this.compiler;
	},
	
	createCompiler : function(callback){	
		var self_ = this;	
		try{
			if(this.template && this.template.length>0){
				self_.compiler = ejs.compile(this.template,{filename : self_.filename});
				if(self_.filename){
					compilerCache[self_.filename] = self_.compiler;
				}		
			}else if(this.filename){
				fs.readFile(this.filename, 'utf8',function(error,str){
					if(error){
						self_.complate = true;
						self_.error = error;						
					}else{
						self_.compiler = ejs.compile(str,{filename : self_.filename});
						compilerCache[self_.filename] = self_.compiler;
						self_.complate = true;
						if(typeof callback == "function"){
							callback(self_);
						}
					}			
				});
				return ;
			}else{
				this.error = new Error("no template!");					
			}
			this.complate = true;
			if(typeof callback == "function"){
				callback(this);
			}		
		}catch(e){
			this.error = new Error(e);	
			if(typeof callback == "function"){
				callback(this);
			}
		}
	}
}

exports.create = function(filename,template){
	return new Ejs(filename,template);
}

/*
exports.render = function(str,context){
	try{
		return ejs.render(str, {
		  locals: context
		});
	}catch(e){
		console.dir(e);		
	}
	return "";
}

exports.createTemplate = function(str){
	var compile = ejs.compile(str);
	return {render:function(context){
		return compile(context);
	}}
}

exports.fileTemplate = function(filename,callback){
	try{
		fs.readFile(filename, 'utf8',function(error,str){
			if(error){
				callback(error);
			}else{
				callback(null,exports.createTemplate(str));
			}			
		});
	}catch(e){
		callback(new Error(e));	
	}
}

exports.renderFile = function(filename,context,callback){
	try{
		fs.readFile(filename, 'utf8',function(error,str){
			if(error){
				callback(error);
			}else{
				var frag = ejs.render(str, {
					filename:filename,
				  	locals: context
				})
				callback(null,frag);
			}			
		});
	}catch(e){
		callback(new Error(e));	
	}
}

exports.renderFileSync = function(filename,context){
	try{
		var str = fs.readFileSync(filename, 'utf8');
		return ejs.render(str, {
			filename:filename,
		  	locals: context
		});
	}catch(e){
		console.dir(e);		
	}
	return "";
}
*/