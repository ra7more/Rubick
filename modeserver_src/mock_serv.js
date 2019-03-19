
const restify = require('restify');
const app = restify.createServer();
const sessions = require('client-sessions');

app.use(
    sessions({
            cookieName: 'test_cookie',
            secret: 'falsdjfalk;',
            duration: 1000*60*10
    })
);
function respond(req, res, next){
    req.test_cookie.par = 'fuck';
    res.send('hello' +req.params.name);
    next();
}

app.get('/test/:name',respond);

app.listen(8080,function(){
    console.log('%s listening at %s', app.name, app.url);
})