var async = require("async");

function Action (Model){

    this.model = Model;
}

Action.prototype.getPageNationQueryList = function(obj,callback){
    var page = obj.page,
        query = obj.query,
        count = parseInt(obj.count)||30,
        m = this.model;
    if(!page)page = 1;
        console.log(query)
    async.waterfall([
        function(cb){
            var mc = m.find(query);
            if(obj.subtype){
                if(obj.query.type=="life"){
                    obj.subtype=="gossip"||obj.subtype=="article"?mc.where("subtype",{$in:["gossip","article"]}):mc.where("subtype",obj.subtype);
                }
            }
            if(obj.tag){
                mc.where("tags",{$elemMatch:{'label':obj.tag}})
            }
            mc.count(query).exec(function(err,total){
                cb(err,total);
            })
        },
        function(total,cb){
            var q = m.find(query);
            if(obj.query.type=="life"){
                console.log("222")
                console.log(obj.subtype)
                obj.subtype=="gossip"||obj.subtype=="article"?q.where("subtype",{$in:["gossip","article"]}):q.where("subtype",obj.subtype);
            }
            if(obj.tag){
                console.log(obj.tag)
                q.where("tags",{$elemMatch:{'label':obj.tag}});
            }
            q.skip((parseInt(page)-1)*count);
            q.limit(count);
            q.sort({'time':-1});
            q.exec(function(err,list){
                cb(err,list,total);
            })
        }
    ],function(err,list,total){
        err?callback(err,null,null):callback(null,list,total);
    })    
    
    // m.count(query,function(err,total){
    //     console.log(total)
    //     m.find(query,
    //         {skip:(parseInt(page)-1)*10,
    //         limit:10
    //     }).sort({"time":-1}).find(function(err,list){
    //         if(err) return callback(err,null);
    //         return callback(null,list,total);
    //     })
    // })    

}
//create
Action.prototype.create = function (doc,callback){
    this.model.create(doc, function (error) {
        if(error) return callback(error);

        console.log("lllllllllllllllllll".red)
        console.log(doc)
        return callback(doc);
    });
};


Action.prototype.getById = function (id, callback) {
    this.model.findOne({_id:id}, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};


Action.prototype.countByQuery = function (query, callback) {
    this.model.count(query, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};


Action.prototype.getByQuery = function (query,fileds,opt,callback) {
    this.model.find(query, fileds, opt, function(error,model){
        if(error) return callback(error,null);

        return callback(null,model);
    });
};


Action.prototype.getAll = function (callback) {
    this.model.find({}, function(error,model){
        if(error) return callback(error,null);

        return callback(null, model);
    });
};

Action.prototype.remove = function (query, callback){
    console.log(query)
    this.model.remove(query, function(error){
        if(error) return callback(error);

        return callback(null);
    });
};


Action.prototype.update = function( conditions, update ,options, callback) {
    this.model.update(conditions, update, options, function (error) {
        if(error) return callback(error);
        return callback(null);
    });
};

var htmltotext = /<[^>]*>|<\/[^>]*>/gm;
var blogreg = /<img[^>]+src="[^"]+"[^>]*>/g;
var srcreg = /src="([^"]+)"/;

Action.prototype.cutword =function(str,len,totext){//截取指定长度的内容，作为预览显示
    if(!str){
        return "";
    }
    if(!len){
        len = 300;
    }
    if(totext){
        str = str.replace(htmltotext,"");
    }
    // str = decodeURIComponent(str);
    // str = Extend.parseContent(str);
    // str = str.replace(htmltotext,"");
    var str_len = str.length;
    str = str.substring(0,len);
    if(len < str_len ){
        str =str+"..." ;
    }
    return str;
};
Action.prototype.cutimg = function(str,imgs){//截取文字并返回
    if(!str){
        return "";
    }
    
    imgs = imgs || [];
    // str = decodeURIComponent(str);
    // str = Extend.parseContent(str);
    var result = str.match(blogreg);
    if(result){
        for (var i=0; i<result.length; i++) {            
            srcreg.exec(result[i]);
            imgs.push(RegExp.$1);
        }
    }
    
    if(imgs.length > 0){
        return imgs[0];
    }
    return "";
}

module.exports = Action;