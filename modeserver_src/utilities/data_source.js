
// https is a built-in module of nodejs
const https = require('https');
const restify = require('restify-clients');

function getcasdata(){
    const options ={
        hostname : '10.204.34.32',
        path: '/tmcas/v1/cloud_analytics/xxxxxxxxxxx',
        method: 'GET',
        rejectUnauthorized: false,
        requestCart: true,
        agent: false
    };
    var receives = [];
    const req = https.request(options, function(res){
        res.on('data', function(data){
             receives.push(data);
        });

        res.on('end',function(){
            var resdata = Buffer.concat(receives).toString();
            resData = JSON.parse(resdata);
            console.log(resData);
        });
    });
    
    req.end();
    req.on('error', function(err){
        console.log(err);
    })
}

function getcasdata_restify(){
    var client = restify.createJSONClient({
        url: 'https://10.204.34.32',
        //url :'https://api.androidhive.info',
        version: '*'
    });
    var options ={
        path: '/tmcas/v1/cloud_analytics/xxxxxxxxxx',
        //path: '/volley/person_object.json', 
        agent: false,
        rejectUnauthorized: false,
        requestCart: true,
    }
    client.get(options, function(err,req,res,obj){
        //assert.ifError(err);
        console.log(obj);
    });
}

//getcasdata();
//getcasdata_restify();


