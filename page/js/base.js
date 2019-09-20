var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: ["css+div", "win7", "模拟飞行", "vagrant", "指针", "php", "分页", "mac", "模拟航天飞机", "wordpress", "C++", "nginx", "树莓派", "ES6", "session", "搞笑", "git", "分区", "数据结构", "Space", "Shuttle", "Mission", "摄像头", "个人博客", "php", "外链", "游戏", "五笔", "mysql", "selenium"]
    },
    computed: {
        randomColor() {
            return function () {
                let red = Math.random() * 255
                let green = Math.random() * 255
                let blue = Math.random() * 255
                return `rgb(${red},${green},${blue})`
            }
        },
        randomSize() {
            return function () {
                let size = Math.random() * 10 + 12 + "px"
                return size
            }
        }
    },
})
var newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: [
            { title: "这是一个链接", link: "https://www.baidu.com" },
            { title: "这是一个链接", link: "www.baidu.com" },
            { title: "这是一个链接", link: "www.baidu.com" },
            { title: "这是一个链接", link: "www.baidu.com" },
        ]
    },
    computed: {

    },
    created() {

    }
})
var newComment = new Vue({
    el: "#new_comments",
    data: {
        commentList: [
            { name: "用户名", date: "2019-9-12", comment: "这是一堆评论" },
            { name: "用户名", date: "2019-9-12", comment: "这是一堆评论" },
            { name: "用户名", date: "2019-9-12", comment: "这是一堆评论" },
            { name: "用户名", date: "2019-9-12", comment: "这是一堆评论" },
        ]
    }
})
var newFriendLink = new Vue({
    el: "#friend_link",
    data: {
        linkList: [
            { name: "这是一个友链", link: "www.baidu.com" },
            { name: "这是一个友链", link: "www.baidu.com" },
            { name: "这是一个友链", link: "www.baidu.com" },
            { name: "这是一个友链", link: "www.baidu.com" },
        ]
    }
})