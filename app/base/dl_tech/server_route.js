var tech = require('./index');

console.log(tech)
module.exports = function (app) {
	console.log("...")
    app.get('/api/tech', tech.gettech);
    app.post('/api/tech',tech.create);
    // app.get('/list', user.list);
    // app.get('/blog', blog.list);
    // app.get('/user', user.list);
    // app.post('/signup', user.create);
    // app.post('/login', user.login);
    // app.get('/logout', user.logout);
    // app.get('/checklogin', index.getLoginUser);
};