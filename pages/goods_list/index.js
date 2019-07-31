// pages/goods_list/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
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
 async aaaa() {
    const res=await request({
      url:"/goods/search",
      data:this.QueryParams
    })
    /*  * 
    
    5 将异步代码改成 更加优雅的 es 7 async语法 
  0 旧版本的微信和旧的手机 直接不要在原生的小程序中使用 es7 的语法！！！
  1 在方法的定义前 加一个 async 
  2 在async描述的方法内 发送的异步代码  在它的前面加一个 await 即可 
  3 容易报一个错误 运行环境不支持 es7 的代码 
  4 会用一个方法 来解决代码中报错的问题
    1 这个方法 不能解决所有的旧手机和旧微信的语法兼容问题 
    
    
    **/
      //判断有无下一页的数据,总页数=总条数/页容量
      this.TotalPages = Math.ceil(res.total / this.QueryParams.pagesize);
      this.setData({
        getgoods:[...this.data.getgoods,...res.goods]
      })
      // 2 下拉刷新没有打开 也可以关闭 因为 没有操作 
      wx.stopPullDownRefresh();
  },
   //页面滚动到低处触发
   onReachBottom() {
    //判断当前总页数是否大于0
    if(this.QueryParams.pagenum>=this.TotalPages) {
        // 没有下一页数据
      wx.showToast({
        title:"没有下一页数据",
        icon: 'none'
      })
    } else {
      this.QueryParams.pagenum++;

      this.aaaa
    }
  },
    // 页面下拉刷新事件
    onPullDownRefresh(){
      // 1 重置 页码
      // 2 重置data中的数组
      // 3 重新发送请求
  
      this.QueryParams.pagenum=1;
      this.setData({
        getgoods:[]
      })
      this.aaaa();
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