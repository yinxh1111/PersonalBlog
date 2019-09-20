var dbutil = require("./DBUtil")
function insertTagBlogMapping(tagId,blogId,ctime,utime,success){
    //注意此处插入数据的时候要用`
    var insertSql = "insert into tag_blog_mapping(`tag_id`,`blog_id`,`ctime`,`utime`) values(?,?,?,?);"
    var params = [tagId,blogId,ctime,utime]
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
    insertTagBlogMapping,

}