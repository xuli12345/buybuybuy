import Vue from 'vue'
import App from './App.vue'

// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// use一下 插件都需要
Vue.use(ElementUI)

// 导入自己抽取的插件
import myHttp from './libs/myHttp'
// use一下
Vue.use(myHttp)

// 导入样式
import './assets/statics/site/css/style.css'

Vue.config.productionTip = false

// 注册过滤器
// 导入moment
import moment from 'moment'

// 修改为可以传递参数
Vue.filter('formatTime', (value, fmtStr) => {
  // value 处理的数据
  // 2017-09-26T12:26:30.000Z2
  // 只要 年月日
  // 切割为数组的方式
  // return value.split('T')[0];
  if (fmtStr) {
    return moment(value).format(fmtStr)
  } else {
    // 没传入参数 用默认的方式格式化
    // moment.js
    return moment(value).format('YYYY-MM-DD HH:mm:ss')
  }
})

// 导入抽取的路由
import router from './libs/router'

// 导入
import store from './libs/store'

new Vue({
  // 渲染内容
  render: h => h(App),
  // 使用生命周期钩子 在项目启动时 判断是否登录
  async beforeCreate() {
    let res = await this.$http.get('site/account/islogin')
    // console.log(res);
    if (res.data.code === 'logined') {
      // 已登录 修改仓库中的数据
      this.$store.commit('changeLogin', true)
    } else {
      // 未登录
      this.$store.commit('changeLogin', false)
    }
  },
  // 路由对象
  router,
  store
})
  // 等同于el:#app
  .$mount('#app')
