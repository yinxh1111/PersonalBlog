let path = new Map()
var everyDayDao = require("../dao/EveryDayDao")
var timeUtil = require("../util/TimeUtil")
var respUtil = require("../util/respondUtil")
function editEveryDay (request,respond){
    request.on("data",function(data){
      everyDayDao.insertEveryDay(data.toString().trim(),timeUtil.getNow(),function(res){
        respond.writeHead(200);
        respond.write(respUtil.writeResult("success","添加成功",null))
        respond.end()
      })
    })
}
function queryEveryDay (request,respond){
      everyDayDao.queryEveryDay(function(res){
        respond.writeHead(200);
        respond.write(respUtil.writeResult("success","添加成功",res))
        respond.end()
      })
}
path.set("/editEveryDay",editEveryDay)
path.set("/queryEveryDay",queryEveryDay)
module.exports={
    path
}