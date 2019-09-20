var path = new Map()
var commentDao = require("../dao/CommentDao")
var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/respondUtil")
var captcha = require("svg-captcha")
function sendComment(request, response) {
    request.on("data", function (data) {
        var temp = JSON.parse(data.toString())
        commentDao.insertComment(parseInt(temp.bid), parseInt(temp.type), temp.name, temp.content, temp.email, timeUtil.getNow(), timeUtil.getNow(), function (res) {
            response.writeHead(200)
            response.write(respUtil.writeResult("success", "评论成功", null))
            response.end()
        })
    })
}
function queryRandomCode(request, response) {
    var img = captcha.create({ fontSize: 50, width: 100, height: 32 })
    response.writeHead(200,{"Content-Type":"image/svg/xml"})
    response.write(respUtil.writeResult("success", "评论成功", img))
    response.end()
}
path.set("/queryRandomCode", queryRandomCode)
path.set("/sendComment", sendComment)
module.exports = {
    path
}