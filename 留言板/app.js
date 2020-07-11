let http = require("http")
let fs = require("fs") //fireSystem
const SQ = require("./sql/sq")

//解析get方式发送过来的参数
let url = require("url")
let art = require("art-template")
// let info = [
//     {
//         "name" : "周杰伦",
//         "question" : "今天天气晴朗"
//     },
//     {
//         "name" : "金俊杰",
//         "question" : "今天天气晴朗"
//     },
//     {
//         "name" : "陈奕迅",
//         "question" : "今天天气晴朗"
//     },
// ]
let server = http.createServer(function(req,res){
    let urlParser = url.parse(req.url,true)
    if(req.url == "/"){
        let sqlStr = `select * from info`
        SQ(sqlStr).then(result=>{
            console.log(result) //result就是最后数据
            let info =result
            console.log(info)
        }) 
        // 访问localhost：3000主页
        fs.readFile("./view/index.html",function(error,data){
            // error是读取错误时候的信息
            // data是读取成功获得的信息
            // console.log(data.toString())
            // data.toString()是网页信息
            // res.end(data.toString())
            // 为什么bootstrap获取不到
            // bootstrap.css没有开放
            // 把bootstrap.css文件客户端读取的权限开放
            let htmlStr  = art.render(data.toString(),{
                message:result
            })
            res.end(htmlStr)
        })
    }
    else if(req.url =="/public/bootstrap.css"){
        fs.readFile("./public/bootstrap.css",function(error,data){
            res.end(data)
        })
    }
    else if(req.url =="/post"){
        fs.readFile("./view/post.html",function(error,data){
            res.end(data)
        })
    }
    else if(urlParser.pathname =="/pinglun"){
        let sqlStr = `insert into info (name,question) values ('${urlParser.query.name}','${urlParser.query.question}')`
        SQ(sqlStr).then(result=>{
            console.log("传入信息后",result)
            if(result.affectedRows>=1){
                res.statusCode = 303
                res.setHeader("Location","/")
                res.end()
            }
        })
        
        
        // 只需要把表格里面的内容放到数组即可
        // info.unshift(urlParser.query)
       
    }
})
server.listen("3000",function(){
    
})


// 网页上的css/js/image这些叫做静态资源
