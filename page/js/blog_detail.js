var blog_detail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        tags: "",
        ctime: "",
        views: "",
        content: "",

    },
    computed: {

    },
    created() {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : ""
        if (searchUrlParams == "") {
            return
        }
        let bid = -1
        for (let i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] == "bid") {
                try {
                    bid = searchUrlParams[i].split("=")[1]
                } catch (error) {
                    console.log(error)
                }
            }
        }
        axios({
            method: "get",
            url: `/queryBlogById?bid=${bid}`
        }).then(function (res) {
            var result = res.data.data[0];
            // console.log(result);//解构赋值之前一定记得加;
            ({
                title: blog_detail.title, content: blog_detail.content,
                ctime: blog_detail.ctime,
                tags: blog_detail.tags,
                views: blog_detail.views
            } = result)
        }, function (error) {
            console.log(error)
        }).catch(function (error) {
            console.log("请求失败")
        })

    },
})
var blog_comment = new Vue({
    el: "#blog_comment",
    data: {
        vcode: "",
        rightCode: "",
    },

    computed: {
        sendComment() {
            return function () {
                var code = document.getElementById("comment_code").value;
                if(code!=this.rightCode){
                    alert("验证码有误")
                    this.changeCode()
                    return
                }
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : ""
                if (searchUrlParams == "") {
                    return
                }
                let bid = -1
                for (let i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == "bid") {
                        try {
                            bid = searchUrlParams[i].split("=")[1]
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
                var type = document.getElementById("comment_type").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
               
                axios({
                    method: "post",
                    url: "/sendComment",
                    data: { type, name, email, content, bid }
                }).then(function (res) {
                    alert(res.data.msg)
                }).catch(function (error) {
                    console.log(error)
                })

            }
        },
        changeCode() {
            return function () {
                axios({
                    url: "/queryRandomCode",
                    method: "get"
                }).then(function (res) {
                    blog_comment.vcode = res.data.data.data
                    blog_comment.rightCode = res.data.data.text
                }).catch(function (error) {
                    console.log(error)
                })
            }
        }
    },
    created() {
       this.changeCode()
    },
    methods: {
       
    },
})