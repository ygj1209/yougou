import {request} from "../../request/index.js";

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 1 轮播图数组
    swiperList: [],
    //导航栏部分
    navsList:[],
    //楼层部分
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getswiperList()
    this.getnavslist()
    this.getfloorlist()
  },
   
  //轮播图部分求情
  getswiperList() {
    request({ url: '/home/swiperdata' })
      .then(result => {
         this.setData({
           swiperList:result
         })
      })
  },
  //导航栏部分请求
  getnavslist() {
    request({
      url:"/home/catitems"
    })
    .then(result=>{
      this.setData({
        navsList:result
      })
    })
  },

  //楼层部分请求
  getfloorlist() {
    request({
      url:"/home/floordata"
    })
    .then(res=>{
      // console.log (res)
      this.setData({
        floorList:res
      })
    })
  }
})