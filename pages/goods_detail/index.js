// pages/goods_detail/index.js
import { request } from "../../request/index.js";
import { getStorageCates, setStorageCates } from "../../util/storeage";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  // 全局变量 商品的完整信息
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getGoodsDetail(options.goods_id)

  },

  //点击图片放大预览
  handlePreviewImage(e) {
    //  console.log (e)
     const {index}=e.currentTarget.dataset
     //拿到数组里面的大图片
     let urls=this.data.goodsObj.pics.map(item=>
       item.pics_big
     )
     const current=urls[index];
     wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },

  // 加入购物车
  handleCartAdd() {
    console.count("用户点击的次数");
    // 该变量 要么是一个完整的对象 要么是一个空对象 ,调用的是本地存储判断有无数据
    let cart = getStorageCates() || {};
    //判断用户是否已经把商品添加到购物车
    if (cart[this.GoodsInfo.goods_id]) {
      // 已经有旧数据了
      cart[this.GoodsInfo.goods_id].num++;
    } else {
      // 第一次新增数据
      cart[this.GoodsInfo.goods_id] = this.GoodsInfo;
      cart[this.GoodsInfo.goods_id].num=1;
    }
    //调用本地存储
    setStorageCates(cart)
    wx.showToast({
      title: '添加成功',
      icon: 'none',
      // true 用户无法操作页面的按钮 遮罩层 蒙版  
      mask: true
    });
  },
   
  //获取商品详情
  async getGoodsDetail(goods_id) {
      const res=await request({url:"/goods/detail",data:{goods_id}})
      console.log (res)
      this.GoodsInfo = res;
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