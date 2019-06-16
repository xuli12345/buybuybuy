import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// // 读取数据
// let goodsData
// try {
//   // 执行可能错误的代码
//   goodsData = JSON.parse(window.localStorage.getItem('cart'))
// } catch (error) {
//   // 如果出错了 会执行catch中的代码
//   // 如果数据格式不对 使用空对象替代
//   goodsData = {}
// }
// 仓库
const store = new Vuex.Store({
  state: {
    // 购物车数据
    goodsData:{},
    // 是否登录
    isLogin: false
  },
  mutations: {
    // 加入购物车
    add2Cart(state, data) {
      // console.log(data);
      // 添加到对象中
      // 累加
      if (state.goodsData[data.id]) {
        // let oldNum = state.goodsData[data.id];
        // oldNum=oldNum+data.num;
        // state.goodsData[data.id] = oldNum;

        state.goodsData[data.id] += data.num
      } else {
        // 新增 Vue对于动态新增的属性 无法跟踪数据的改变 必须 Vue.set
        // 本质是 设置了 get 和 set
        // state.goodsData[data.id]=data.num;
        Vue.set(state.goodsData, data.id, data.num)
      }
      // console.log(state.goodsData);
    },
    // 修改数据的方法
    updateCart(state, sendObj) {
      // console.log(sendObj)
      state.goodsData = sendObj
    },
    // 修改登录状态的方法
    changeLogin(state, isLogin) {
      state.isLogin = isLogin
    }
  },
  getters: {
    totalCount(state) {
      // 计算
      let num = 0
      for (const key in state.goodsData) {
        num += state.goodsData[key]
      }
      return num
    }
  }
})
// 浏览器关闭
window.onbeforeunload = function() {
  // window.localStorage.setItem('cart', JSON.stringify(store.state.goodsData))
}

export default store
