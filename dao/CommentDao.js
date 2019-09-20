var dbutil = require("./DBUtil")
function insertComment(blog_id,parent,user_name,comments,email,ctime,utime,success){
    //注意此处插入数据的时候要用`
    var insertSql = "insert into comments(`blog_id`,`parent`,`user_name`,`comments`,`email`,`ctime`,`utime`) values(?,?,?,?,?,?,?)"
    var params = [blog_id,parent,user_name,comments,email,ctime,utime]
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
function queryComment(tag,success){
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
    insertComment,
    queryComment
}