let dbutil = require("./DBUtil")
function insertBlog(title, content, views, tags, ctime, utime, success) {
    //注意此处插入数据的时候要用`
    var insertSql = "insert into blog(`title`,`content`,`views`,`tags`,`ctime`,`utime`) values(?,?,?,?,?,?)"
    var params = [title, content, views, tags, ctime, utime]
    var connection = dbutil.createConnection()
    connection.connect()
    connection.query(insertSql, params, function (error, res) {
        if (error) {
            throw new Error(error)
        } else {
            success(res)
        }
    })
    connection.end()
}
function queryBlogByPage(page, pageSize, success) {
    var querySql = "select * from blog order by id desc limit ?,?;"
    var params = [page * pageSize, pageSize]
    var connection = dbutil.createConnection()
    connection.connect()
    connection.query(querySql, params, function (error, res) {
        if (error) {
            throw new Error(error)
        } else {
            success(res)
        }
    })
    connection.end()
}
function queryBlogCount(success) {
    var querySql = "select count(1) as count from blog;"
    var params = []
    var connection = dbutil.createConnection()
    connection.connect()
    connection.query(querySql, params, function (error, res) {
        if (error) {
            throw new Error(error)
        } else {
            success(res)
        }
    })
    connection.end()
}
function queryBlogById(id,success) {
    var querySql = "select * from blog where id=?;"
    var params = [id]
    var connection = dbutil.createConnection()
    connection.connect()
    connection.query(querySql, params, function (error, res) {
        if (error) {
            throw new Error(error)
        } else {
            success(res)
        }
    })
    connection.end()
}
module.exports = { insertBlog, queryBlogByPage,queryBlogCount,queryBlogById }