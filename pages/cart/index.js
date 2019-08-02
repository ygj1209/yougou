// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 获取收货地址
  handleChooseAddress(){

    // 1 获取用户对小程序的授权信息
    wx.getSetting({
      success: (result1) => {
        // 获取到了授权信息
        const scopeAddress=result1.authSetting['scope.address'];
        // 用户授权过  或者 用户 从来没有调用过收货地址  
        if(scopeAddress===true||scopeAddress===undefined){
          // 1.1 调用收货地址
          wx.chooseAddress({
            success: (result2) => {
              console.log(result2);
            }
          });
        }else{
          // 2.1用户 点击 拒绝收货地址  诱导用户 打开授权页面 再调用获取收货地址
          wx.openSetting({
            success: () => {
              // 2.2 再去调用 获取收货地址
              wx.chooseAddress({
                success: (result3) => {
                  console.log(result3);
                },
                fail: () => {},
                complete: () => {}
              });

            }
          });

        }
      },
      fail: () => {},
      complete: () => {}
    });
  }
})