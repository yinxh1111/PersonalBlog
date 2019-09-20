let path = new Map()
var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/respondUtil")
var blogDao = require("../dao/BlogDao")
var tagDao = require("../dao/TagDao")
var tagBlogMappingDao = require("../dao/TagBlogMapping")
var url = require("url")
function editBlog(request, respond) {
  var params = url.parse(request.url, true).query;
  var tags = params.tags.replace(/ /g, "").replace("，", ",")
  request.on("data", function (data) {
    blogDao.insertBlog(params.title, data.toString(), 0, tags, timeUtil.getNow(), timeUtil.getNow(), function (res) {
      respond.writeHead(200);
      respond.write(respUtil.writeResult("success", "添加成功", null))
      respond.end()
      var blogId = res.insertId;
      var tagList = tags.split(",")
      for (let i = 0; i < tagList.length; i++) {
        if (tagList[i] == "") {
          continue;
        }
        queryTag(tagList[i], blogId)
      }
    })
  })
}
function queryTag(tag, blogId) {
  tagDao.queryTag(tag, function (result) {
    if (result == null || result.length == 0) {
      insertTag(tag, blogId)
    } else {
      insertTagBlogMapping(result[0].id, blogId)
    }
  })
}
function insertTag(tag, blogId) {
  tagDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (res) {
    insertTagBlogMapping(res.insertId, blogId)
  })
}
function insertTagBlogMapping(tagId, blogId) {
  tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (res) {

  })
}
function queryBlogByPage(request, respond) {
  var params = url.parse(request.url,true).query;
  blogDao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),function (res) {
    for(let i=0;i<res.length;i++){
      res[i].content=res[i].content.replace(/<img[\w\W]*>/g,"");
    }
    respond.writeHead(200);
    respond.write(respUtil.writeResult("success", "添加成功", res))
    respond.end()
  })
}
function queryBlogById(request, respond) {
  var params = url.parse(request.url,true).query;
  blogDao.queryBlogById(parseInt(params.bid),function (res) {
    respond.writeHead(200);
    respond.write(respUtil.writeResult("success", "添加成功", res))
    respond.end()
  })
}
function queryBlogCount(request,response){
  blogDao.queryBlogCount(function(res){
    response.writeHead(200)
    response.write(respUtil.writeResult("success","查询成功",res))
    response.end()
  })
}

path.set("/editBlog", editBlog)
path.set("/queryBlogByPage", queryBlogByPage)
path.set("/queryBlogCount", queryBlogCount)
path.set("/queryBlogById", queryBlogById)
module.exports = {
  path
}