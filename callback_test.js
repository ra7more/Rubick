var fs = require('fs');

function blocking_readfile(){
    var data = fs.readFileSync('input.txt'); 
    //obviously readfile sync will block the code under that line utill it's done
    console.log(data.toString());
    console.log('program end');
}

function nonblocking_readfile(){
    fs.readFile('input.txt',function(err,data){
        if(err) return console.error(err);
        console.log(data.toString());
    })
    console.log('program end');
}

module.exports = {
    blocking_test : blocking_readfile,
    nonblocking_test : nonblocking_readfile
}
