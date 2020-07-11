let http = require("http")
let server = http.createServer( function(req,res){
    // req是request客服端发出的请求
    // res是respone服务端发出的请求
    if(req.url=='/index'){
        res.end("index page")
    }
    if(req.url=='/json'){
        res.end("json page")
    }
} )

// 回调函数，服务搭建后，系统执行功能
server.listen("4000",function(){
    console.log("success")
})