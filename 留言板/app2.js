// 引入express的包
let express = require("express")
let art = require("express-art-template")
const bodyParser = require("body-parser")
// 生成路由
let router = express.Router()
// 初始化express
let app = express()
app.use("/public/",express.static("./public/"))
app.engine('html',art)
app.use(bodyParser.json())
// 使用路由系统
app.use(router)

router.get("/",function(res,res){
    res.end("this.is index")
})
.get("/post", function(res,res){
    res.end("this is post")
})
app.listen("3000",function(){
    console.log("ok")
})