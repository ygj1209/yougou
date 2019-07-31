// pages/goods_list/index.js
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