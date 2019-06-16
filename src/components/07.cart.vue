<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车
            </h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8"
            >
              <tbody>
                <!-- 表头 -->
                <tr>
                  <th width="48" align="center">
                    <a>选择</a>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <!-- 空车 -->
                <tr v-if="goodsList.length==0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>
                          您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <!-- 有东西的车 -->
                <tr v-for="(item,index) in goodsList">
                  <td width="48" align="center">
                    <!-- switch -->
                    <el-switch
                      v-model="item.isChecked"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    ></el-switch>
                  </td>
                  <td class="my-td" align="left" width="300" colspan="2">
                    <img class="good-img" :src="item.img_url" alt>
                    {{item.title}}
                  </td>
                  <td width="60" align="left">{{item.sell_price}}</td>
                  <td width="80" align="center">{{item.buycount}}</td>
                  <td width="80" align="left">{{item.sell_price*item.buycount}}</td>
                  <td width="300" align="center">
                    <!-- 计数器 -->
                    <el-input-number v-model="item.buycount" :min="1" :max="10" label="描述文字"></el-input-number>&nbsp;
                    &nbsp;
                    <!-- 删除 -->
                    <el-button type="danger" @click="delOne(index)" icon="el-icon-delete" circle></el-button>
                  </td>
                </tr>
                <tr>
                  <th>全选
                    <el-switch v-model="checkAll" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                  </th>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{checkedGoods.totalNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{checkedGoods.totalPrice}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
              <router-link :to="'/fillOrder/'+checkedGoods.ids">
                <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
              </router-link>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: []
    }
  },
  // 计算属性
  computed: {
    // 权限
    checkAll: {
      get() {
        // 是否全部选中
        let checkedArr = this.goodsList.filter(v => {
          return v.isChecked
        })
        return checkedArr.length == this.goodsList.length
      },
      set(value) {
        this.goodsList.forEach(v => {
          v.isChecked = value
        })
      }
    },
    // 计算总金额 和总数
    checkedGoods() {
      // 总价
      let totalNum = 0
      // 总金额
      let totalPrice = 0
      // 选中的ids  
      let ids = '';
      this.goodsList.forEach(v => {
        if (v.isChecked == true) {
          totalNum += v.buycount
          totalPrice += v.buycount * v.sell_price
          // 拼接
          ids+=v.id;
          ids+=','
        }
      })
      // 去除结尾,
      ids = ids.slice(0,-1);
      // 返回多个参数
      return {
        totalNum,
        totalPrice,
        ids
      }
    }
  },
  methods: {
    // 删除某一条数据
    delOne(index) {
      this.goodsList.splice(index, 1)
    }
  },
  // 侦听器
  watch: {
    goodsList: {
      deep: true,
      handler(val, oldVal) {
        // console.log(this.goodsList);
        // 整个提交 {id:个数}
        let sendObj = {}
        this.goodsList.forEach(v => {
          sendObj[v.id] = v.buycount
        })
        // 提交到Vuex
        this.$store.commit('updateCart', sendObj)
      }
    }
  },
  async created() {
    // 生成参数
    let ids = ''
    // 仓库中的数据
    for (const key in this.$store.state.goodsData) {
      ids += key
      ids += ','
    }
    // 去掉,
    ids = ids.slice(0, -1)
    // console.log(ids);
    // 数据获取
    let res = await this.$http.get(`site/comment/getshopcargoods/${ids}`)

    // 动态增加 先把所有需要使用的属性添加好
    // 再赋值给Vue 的data Vue会自动为所有属性 增加get和set
    // res.data.message.forEach(v=>{
    //   v.buycount = this.$store.state.goodsData[v.id]
    //   v.isChecked = true;
    // })
    // 赋值
    this.goodsList = res.data.message
    // 先默认存在的属性添加给Vue
    // 动态增加了一个 isChecked属性Vue没有跟踪
    this.goodsList.forEach(v => {
      v.buycount = this.$store.state.goodsData[v.id]
      // v.isChecked = true
      // Vue.set的组件中的用法
      this.$set(v, 'isChecked', true)
    })
  }
}
</script>

<style>
.good-img {
  width: 50px;
  height: 50px;
}
.my-td {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
