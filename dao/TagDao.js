var dbutil = require("./DBUtil")
function insertTag(tag,ctime,utime,success){
    //注意此处插入数据的时候要用`
    var insertSql = "insert into tags(`tag`,`ctime`,`utime`) values(?,?,?)"
    var params = [tag,ctime,utime]
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
function queryTag(tag,success){
    //注意此处插入数据的时候要用`
    var insertSql = "select * from tags where tag=?;"
    var params = [tag]
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
module.exports={
    insertTag,
    queryTag
}