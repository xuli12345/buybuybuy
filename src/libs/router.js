// 导入Vue 导入的模块会被缓存，重复导入直接使用缓存的
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 因为这个页面要用到弹框 为了简化代码 按需导入 弹框组件
import { Message } from 'element-ui'
// console.log(Message)

// use一下
Vue.use(VueRouter)

// 导入组件
// import index from '../components/index.vue'
// import detail from '../components/02.detail.vue'
// import userRoot from '../components/03.userRoot.vue'
// import userCenter from '../components/04.userCenter.vue'
// import userOrder from '../components/05.userOrder.vue'
// import userDetail from '../components/06.userDetail.vue'
// import cart from '../components/07.cart.vue'
// import fillOrder from '../components/08.fillOrder.vue'
// import login from '../components/09.login.vue'
// import payMoney from '../components/10.payMoney.vue'
// import paySuccess from '../components/11.paySuccess.vue'
const index = () => import('../components/index.vue')
const detail = () => import('../components/02.detail.vue')
const userRoot = () => import('../components/03.userRoot.vue')
const userCenter = () => import('../components/04.userCenter.vue')
const userOrder = () => import('../components/05.userOrder.vue')
const userDetail = () => import('../components/06.userDetail.vue')
const cart = () => import('../components/07.cart.vue')
const fillOrder = () => import('../components/08.fillOrder.vue')
const login = () => import('../components/09.login.vue')
const payMoney = () => import('../components/10.payMoney.vue')
const paySuccess = () => import('../components/11.paySuccess.vue')

// 路由规则
let routes = [
  // 重定向
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index
  },
  {
    path: '/detail/:id',
    component: detail
  },
  {
    path: '/cart',
    component: cart
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/fillOrder/:ids',
    component: fillOrder,
    // 路由元信息
    meta: {
      // 是否需要登录 denglu
      checkLogin: true
    }
  },
  {
    path: '/paySuccess',
    component: paySuccess,
    // 路由元信息
    meta: {
      // 是否需要登录 denglu
      checkLogin: true
    }
  },
  {
    path: '/payMoney/:orderid',
    component: payMoney,
    // 路由元信息
    meta: {
      // 是否需要登录 denglu
      checkLogin: true
    }
  },
  {
    path: '/user',
    component: userRoot,
    meta: {
      checkLogin: true
    },
    children: [
      {
        path: '', // /user/center
        redirect: 'center'
      },
      {
        path: 'center', // /user/center
        component: userCenter,
        meta: {
          checkLogin: true
        }
      },
      {
        path: 'order', // /user/order
        component: userOrder,
        meta: {
          checkLogin: true
        }
      },
      {
        path: 'detail/:orderid', // /user/detail
        component: userDetail,
        meta: {
          checkLogin: true
        }
      }
    ]
  }
]

// 实例化路由
let router = new VueRouter({
  // 不要 #/的哈希模式
  // mode: 'history',
  routes
})
// 导航守卫
router.beforeEach(async (to, from, next) => {
  // console.log(to)
  Message.success('欢迎回来！！！')
  // if (to.path === '/fillOrder') {
  // 通过路由元信息判断
  if (to.meta.checkLogin === true) {
    // 判断
    let res = await Vue.prototype.$http.get('site/account/islogin')
    // console.log(res)
    if (res.data.code === 'nologin') {
      // Vue.prototype.$message.success()
      Message.warning('哥们请先登录')
      // 去登录页
      next('/login')
    } else {
      next()
    }
  } else {
    // 必须next
    next()
  }
})

// 实例化路由对象 并暴露出去
export default router
