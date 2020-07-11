//操作数据库的
const mysql = require("mysql") //下载的mysql系统包
const MYSQL_CON  = require("../config/config")
// 数据库的操作是异步的


//node 链接数据库的步骤
// 1.连接数据库 创建数据库连接，传入配置
const con = mysql.createConnection(MYSQL_CON)
con.connect()

// 2.定一个方法，用来操作数据库，因为操作数据库是异步的，必须用promise
const SQ = (sqlstr)=>{
    // 一般操作数据库会传入操作语句，例如 insert into
    let promise = new Promise((res,rej)=>{
        con.query(sqlstr,(error,result)=>{
            if(error){
                rej(error)
                return 
            }else{
                res(result)
            }
        })
    })
    // sq的函数执行完需要有一个结果
    return promise
}
// 导出sq的方法，用来给其他页面使用
module.exports =SQ