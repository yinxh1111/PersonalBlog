let dbutil =require("./DBUtil")
function insertEveryDay(content,ctime,success){
    //注意此处插入数据的时候要用`
    var insertSql = "insert into every_day(`content`,`ctime`) values(?,?)"
    var params = [content,ctime]
    var connection = dbutil.createConnection()
    connection.connect()
    connection.query(insertSql,params,function(error,res){
        if(error){
            throw new Error(error)
        }else{
            success(res)
        }
    })
    connection.end()
}
function queryEveryDay(success){
    var querySql = "select * from every_day order by id desc limit 1;"
    var params = []
    var connection = dbutil.createConnection()
    connection.connect()
    connection.query(querySql,params,function(error,res){
        if(error){
            throw new Error(error)
        }else{
            success(res)
        }
    })
    connection.end()
}
module.exports={insertEveryDay,queryEveryDay}