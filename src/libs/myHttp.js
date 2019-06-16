// 导入axios
import axios from 'axios'

// 设置axios的基础地址方便后续编码
axios.defaults.baseURL = 'http://111.230.232.110:8899'
// 允许axios跨域携带cookie 默认是不携带
axios.defaults.withCredentials = true

// 暴露出去
export default{
  install(Vue){
    // 把axios 设置到Vue构造函数的原型上
    Vue.prototype.$http = axios;
  }
}