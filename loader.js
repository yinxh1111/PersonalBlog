let fs = require("fs")
let globalConfig = require("./config")
let controllerSet = []
var pathMap = new Map()
var files = fs.readdirSync(globalConfig.web_path)
for (let i = 0; i < files.length; i++) {
    let temp = require(`./${globalConfig.web_path}/${files[i]}`)
    if (temp.path) {
        for (let [k, v] of temp.path) {
            if (pathMap.get(k) == null) {
                pathMap.set(k, v)
            } else {
                throw new Error(`url path异常,url${key}`)
            }
        }
        controllerSet.push(temp)
    }
}
module.exports=pathMap