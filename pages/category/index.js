// pages/category/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 左侧的菜单数组
    leftMenuList: [],
    //右侧内容部分
    rightGoodsList: [],
     // 选中的菜单
     currentIndex:0,
     scrollTop:0
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
      //发送请求之前判断一下有没有数据存储
      let cates=wx.getStorageSync("cates")
      
      if (!cates) {
        //没有数据则执行
        this.getcategories()
      } else {
      //有数据,判断时间是否过期
      if (Date.now()-cates.time>1000*20) {
        //获取过期数据，直接发送
        this.getcategories()
      } else  {
        //数据没有过期，直接发送请求
        this.Cates=cates.data;
        let leftMenuList=this.Cates.map((item,index)=>({cat_name:item.cat_name,cat_id:item.cat_id}))
        //显示当前的菜单
        let rightGoodsList=this.Cates[0].children
        this.setData({
          leftMenuList,
          rightGoodsList
        })
      }

     }
  },
   
  getcategories() {
    request({
      url:"/categories"
    })
    .then(res=>{
      // console.log (res)
      // 给全局参数 赋值
      this.Cates=res;
      let leftMenuList=this.Cates.map((item,index)=>({cat_name:item.cat_name,cat_id:item.cat_id}))
      //显示当前的菜单
      let rightGoodsList=this.Cates[0].children
      this.setData({
        leftMenuList,
        rightGoodsList
      })
    })
  },
  goods_category(e) {
     const {index}=e.currentTarget.dataset
   // 实现菜单的激活选中
   let rightGoodsList =  this.Cates[index].children;
    this.setData({
       currentIndex:index,
       rightGoodsList,
       scrollTop:0
    })
  }
})