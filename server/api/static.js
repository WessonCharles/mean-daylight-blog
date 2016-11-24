
var fs = require("fs");


exports.writeFile = function(res,filename,ctype){
	fs.exists(filename, function(exists) {
		if(!exists) {
		  	res.writeHead(404, {"Content-Type": "text/plain"});
		  	res.write("404 Not Found\n");
		  	res.end();
		 	return;
		}

		if (fs.statSync(filename).isDirectory()) filename += '/index.html';

		fs.readFile(filename, function(err, file) {
		  if(err) {
		      res.writeHead(500, {"Content-Type": "text/plain"});
		      res.write(err + "\n");
		      res.end();
		      return;
		  }

		  res.writeHead(200,{"Content-Type": ctype || "text/html"});
		  res.write(file);
		  res.end();

		});
	  });
}
  

