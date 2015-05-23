var async = require("async");

function Action (Model){

    this.model = Model;
}

Action.prototype.getPageNationQueryList = function(obj,callback){
    var page = obj.page,
        query = obj.query,
        m = this.model;
        console.log(query)
    async.waterfall([
        function(cb){
            m.count(query,function(err,total){
                cb(err,total);
            })
        },
        function(total,cb){
            var q = m.find(query);
            q.skip((parseInt(page)-1)*10);
            q.limit(10);
            q.sort({'time':-1});
            q.find(function(err,list){
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

module.exports = Action;