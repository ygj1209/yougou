 
 //封装一个全局加载中的提示
let ajaxtimes =0;

export const request = (params) => {
     /* 
  1 因为首页是同时发送3个请求出去
  2 当某一个请求回来了就会关闭等待图标
  3 但是 后两个请求还没有回来，页面上已经没有等待图标。。。
  
  1 必须等待3个请求都回来了，再关闭 等待图标！！！
   */
  // 显示正在等待的图标
  wx.showLoading ({
     title:"加载中..."
  })
  ajaxtimes++
  // console.log("发送出去的异步的格式:"+ajaxtimes);
    // 统一的接口的前缀
    const baseUrl = "https://api.zbztb.cn/api/public/v1";
    return new Promise((reslove, reject) => {
      wx.request({
        ...params,
        url: baseUrl + params.url,
        success: (result) => {
          reslove(result.data.message);
        },
        fail: (error) => {
          reject(error);
        },
        //当数据都请求回来了我们就清除加载中的提示
        complete: ()=> {
          ajaxtimes--

          if (ajaxtimes===0) {
            //清除加载中提示
             wx.hideLoading()
          }
        }
      });
    })
  }