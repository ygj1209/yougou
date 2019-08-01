// pages/goods_detail/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getGoodsDetail(options.goods_id)

  },
   
  //获取商品详情
  async getGoodsDetail(goods_id) {
      const res=await request({url:"/goods/detail",data:{goods_id}})
      console.log (res)
      this.setData({
        goodsObj:{
          goods_name:res.goods_name,
          goods_price:res.goods_price,
          //把webp的图片格式替换成jpg的格式
          goods_introduce:res.goods_introduce.replace(/\.webp/g,'.jpg'),
          pics:res.pics
        }
      })
   }  
})