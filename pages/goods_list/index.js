// pages/goods_list/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Tabs:[
      {id:0,title:"综合",Tabscurrgoods:true},
      {id:1,title:"销量",Tabscurrgoods:false},
      {id:2,title:"价格",Tabscurrgoods:false}
    ],
    getgoods:[]
  },
  QueryParams:{
    query: "",
    // 分类id 
    cid: "",
    // 页码 
    pagenum: 1,
    // 页容量
    pagesize: 10
  },
   // 总页数
   TotalPages: 1,
  onLoad(options) {
    this.QueryParams.cid=options.cid;
    this.aaaa();
  },
 
  //商品详情请求
  aaaa() {
    request({
      url:"/goods/search",
      data:this.QueryParams
    })
    .then(res=>{
      // console.log (res)
      //判断有无下一页的数据,总页数=总条数/页容量
      this.TotalPages = Math.ceil(res.total / this.QueryParams.pagesize);
      this.setData({
        getgoods:[...this.data.getgoods,...res.goods]
      })
    })
  },
   //页面滚动到低处触发
   onReachBottom() {
    //判断当前总页数是否大于0
    if(this.QueryParams.pagenum>=this.TotalPages) {
        // 没有下一页数据
      console.log("没有下一页数据");
    } else {
      this.QueryParams.pagenum++;

      this.aaaa
    }
  },
  //tab栏切换
  handleTitleChange(e) {
     // 先获取子组件传递过来的数据
     const { index } = e.detail;
      // 获取源数组
        let { Tabs } = this.data;
        Tabs.forEach((item,i)=>{
        //判断
        if(i===index) {
           item.Tabscurrgoods=true
        } else {
          item.Tabscurrgoods=false
        }
     })
     this.setData({
        Tabs
     })
  }
})