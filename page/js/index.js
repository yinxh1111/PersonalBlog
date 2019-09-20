var every_day = new Vue({
    el: "#every_day",
    data: {
        content: "absadsadas"
    },
    computed: {
        getContent() {
            return this.content
        }
    },
    created() {
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(function (res) {
            every_day.content = res.data.data[0].content
        }, function (error) {
            console.log(error)
        })
    },
})
var article_list = new Vue({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 5,
        count:0,
        pageNumList:[],
        articleList: [
            {
                title: " 乱码表，看懂常见编码乱码",
                content: "乱码，是最常遇到的问题，这个表貌似可以轻松的通过“乱码”的样子明白乱码原因。好吧，我承认这是又水了一篇。。。。",
                date: "2019-08-10",
                views: "100",
                tags: "test1 test2",
                id: "1",
                link: "",
            }
        ]
    },
    computed: {
        getPage() {
            return function (page, pageSize) {
                axios({
                    method: "get",
                    url: `/queryBlogByPage?page=${page - 1}&pageSize=${pageSize}`,
                }).then(function (res) {
                   var result = res.data.data
                   var list = []
                    for (let i = 0; i < result.length; i++) {
                        var temp = {}
                        temp.title = result[i].title
                        temp.content = result[i].content
                        temp.date = (result[i].ctime)
                        temp.views = result[i].views
                        temp.tags = result[i].tags
                        temp.id = result[i].id
                        temp.link = `/blog_detail.html?bid=${result[i].id}`
                        list.push(temp)
                    }
                    article_list.articleList=list;
                    article_list.page=page
                }, function (err) {
                    console.log(err)
                })
                axios({
                    method:"get",
                    url:"/queryBlogCount"
                }).then(function (res) {
                    article_list.count=res.data.data[0].count
                    article_list.generatePageTool
                })
            }
        },
        //翻页组件
        generatePageTool(){
            var nowPage =this.page
            var pageSize=this.pageSize
            var totalPage=this.count
            var result=[]
            result.push({text:"<<",page:1})
            if(nowPage>2){
                result.push({text:nowPage-2,page:nowPage-2})
            }
            if(nowPage>1){
                result.push({text:nowPage-1,page:nowPage-1})
            }
            result.push({text:nowPage,page:nowPage})
            if(nowPage<(totalPage+pageSize-1)/pageSize-1){
                result.push({text:nowPage+1,page:nowPage+1})
            }
            if(nowPage<(totalPage+pageSize-1)/pageSize-2){
                result.push({text:nowPage+2,page:nowPage+2})
            }
            result.push({text:">>",page:parseInt((totalPage+pageSize-1)/pageSize)})
            this.pageNumList=result
            return result
        }
    },
    methods:{
        jumpTo(page){
            this.getPage(page,this.pageSize)
        }
    },
    created() {
        this.getPage(this.page, this.pageSize)
    }
})
