var fs = require('fs'),
    pth = require('path'),
    crypto = require('crypto'),
    Url = require('url');


module.exports = function(){
	explorer(__dirname+"/app",{});
}


function createmd5(data){
	var md5sum = crypto.createHash('md5'),
        encoding = typeof data === 'string' ? 'utf8' : 'binary';
    md5sum.update(data, encoding);
    return md5sum.digest('hex').substring(0, 7);
}


function explorer(path,finalcode){
	if(path.indexOf("node_modules")==-1&&path.indexOf(".git")==-1){
		fs.readdir(path, function(err,files){
			if(err){
				console.log("error:\n"+err);
				return;
			}
			files.forEach(function(file){
				fs.stat(path+"/"+file,function(err,stat){
					if(err){
						console.log(err);
						return;
					}
			        if(stat.isDirectory()){
		        		// console.log(path+"/"+file+"/");
		            	explorer(path+"/"+file,finalcode);	
			        }else{
			        	// console.log(path+"/"+file);
			        	var origCode = fs.readFileSync(path+"/"+file, 'utf8');
			        	var key = path.split(__dirname+"/app")[1]?('/'+path.split(__dirname+"/app")[1]+'/'+file):("/"+file);
			        	if(key.split("/").length==2||key.indexOf("static")>-1||key.indexOf("bower_components")>-1){
			        		key = 'base/..'+"/"+key.split("//")[1]; 
			        	}else{
			        		key = key.split("//")[1];
			        	}
			        	console.log(key)
			        	finalcode[key] = createmd5(origCode);
			        	fs.writeFileSync(__dirname+"/app/md5-map.js", "window.md5_map = "+JSON.stringify(finalcode), 'utf8');
			        }
			            
			    });
			    // 
			});

		});    
	}

}


