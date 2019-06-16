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
                <li class="active">
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
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <el-form
              :model="sendData"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="收货人姓名:" prop="accept_name" class="my-form-item">
                <el-input v-model="sendData.accept_name"></el-input>
              </el-form-item>
              <el-form-item label="所属地区:" prop="area" class="my-form-item">
                <!-- 省市联动 -->
                <v-distpicker @selected="selectedArea"></v-distpicker>
              </el-form-item>
              <el-form-item label="详细地址:" prop="address" class="my-form-item">
                <el-input v-model="sendData.address"></el-input>
              </el-form-item>
              <el-form-item label="手机号码:" prop="mobile" class="my-form-item">
                <el-input v-model="sendData.mobile"></el-input>
              </el-form-item>
              <el-form-item label="联系电话:" class="my-form-item">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱:" prop="email" class="my-form-item">
                <el-input v-model="sendData.email"></el-input>
              </el-form-item>
              <el-form-item label="邮政编码:" prop="post_code" class="my-form-item">
                <el-input v-model="sendData.post_code"></el-input>
              </el-form-item>
              <div id="orderForm" name="orderForm" url>
                <div class="form-box address-info"></div>
                <h2 class="slide-tit">
                  <span>2、支付方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <el-radio v-model="sendData.payment_id" :label="6">在线支付</el-radio>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>3、配送方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <el-radio
                      v-model="sendData.express_id"
                      :label="1"
                      @click.native="sendData.expressMoment= 20"
                    >
                      顺丰
                      <span class="my-span">费用 20</span>
                    </el-radio>
                    <el-radio
                      v-model="sendData.express_id"
                      :label="2"
                      @click.native="sendData.expressMoment= 18"
                    >
                      圆通
                      <span class="my-span">费用 18</span>
                    </el-radio>
                    <el-radio
                      v-model="sendData.express_id"
                      :label="3"
                      @click.native="sendData.expressMoment= 5"
                    >
                      韵达
                      <span class="my-span">费用 5</span>
                    </el-radio>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>4、商品清单</span>
                </h2>
                <div class="line15"></div>
                <table
                  width="100%"
                  border="0"
                  align="center"
                  cellpadding="8"
                  cellspacing="0"
                  class="cart-table"
                >
                  <tbody>
                    <tr>
                      <th colspan="2" align="left">商品信息</th>
                      <th width="84" align="left">单价</th>
                      <th width="84" align="center">购买数量</th>
                      <th width="104" align="left">金额(元)</th>
                    </tr>
                    <tr v-for="(item,index) in goodsList">
                      <td width="68">
                        <a target="_blank" href="/goods/show-89.html">
                          <img :src="item.img_url" class="img">
                        </a>
                      </td>
                      <td>
                        <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                      </td>
                      <td>
                        <span class="red">￥{{item.sell_price}}</span>
                      </td>
                      <td align="center">{{item.buycount}}</td>
                      <td>
                        <span class="red">￥{{item.sell_price*item.buycount}}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="line15"></div>
                <h2 class="slide-tit">
                  <span>5、结算信息</span>
                </h2>
                <div class="buy-foot clearfix">
                  <div class="left-box">
                    <dl>
                      <dt>订单备注(100字符以内)</dt>
                      <dd>
                        <textarea
                          v-model="sendData.message"
                          name="message"
                          class="input"
                          style="height:35px;"
                        ></textarea>
                      </dd>
                    </dl>
                  </div>
                  <div class="right-box">
                    <p>
                      商品
                      <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                      <label
                        id="goodsAmount"
                        class="price"
                      >{{sendData.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                      运费：￥
                      <label id="expressFee" class="price">{{sendData.expressMoment}}</label> 元
                    </p>
                    <p class="txt-box">
                      应付总金额：￥
                      <label
                        id="totalAmount"
                        class="price"
                      >{{sendData.expressMoment+sendData.goodsAmount}}</label>
                    </p>
                    <p class="btn-box">
                      <a class="btn button" href="/cart.html">返回购物车</a>
                      <a @click="setOrder" id="btnSubmit" class="btn submit">确认提交</a>
                    </p>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入
import VDistpicker from 'v-distpicker'

export default {
  data() {
    // 验证的函数
    var validateMobile = (rule, value, callback) => {
      //  正则表达式
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (reg.test(value)) {
        // 通过
        callback()
      } else {
        // 格式不对
        callback(new Error('请正确输入手机号'))
      }
    }
    var validateEmail = (rule, value, callback) => {
      //  正则表达式
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if (reg.test(value)) {
        // 通过
        callback()
      } else {
        // 格式不对
        callback(new Error('请正确输入邮箱地址'))
      }
    }
    var validatePostCode = (rule, value, callback) => {
      //  正则表达式
      let reg = /^[1-9]\d{5}(?!\d)$/
      if (reg.test(value)) {
        // 通过
        callback()
      } else {
        // 格式不对
        callback(new Error('请正确输入邮编'))
      }
    }

    return {
      sendData: {
        // 商品id
        goodsids: '',
        // 商品总价格
        goodsAmount: 0,
        // 收货人姓名
        accept_name: '琼改改',
        // 区域
        area: '',
        // 地址
        address: '深圳宝安区翻身地铁站隔壁的前海商务公园2栋301',
        // 手机
        mobile: '18888886666',
        // 邮箱
        email: '666@qq.com',
        // 邮编
        post_code: '518000',
        // 支付方式
        payment_id: 6,
        // 运送方式
        express_id: 1,
        // 备注信息
        message: '你要是不尽快发货，我就给你差评，你怕不怕',
        // 快递费
        expressMoment: 20,
        // 商品基础信息
        cargoodsobj: {}
      },
      // 表单数据验证
      rules: {
        accept_name: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        address: [
          { required: true, trigger: 'blur', message: '请输入详细地址' }
        ],
        mobile: [
          {
            validator: validateMobile,
            trigger: 'blur'
          }
        ],
        email: [
          {
            validator: validateEmail,
            trigger: 'blur'
          }
        ],
        post_code: [
          {
            validator: validatePostCode,
            trigger: 'blur'
          }
        ]
      },
      // 商品列表
      goodsList: [],
      // 商品总个数
      totalCount: 0
    }
  },
  // 方法
  methods: {
    // 选择区域
    selectedArea(area) {
      // console.log(area);
      this.sendData.area = area
    },
    // 提交订单
    async setOrder() {
      let res = await this.$http.post(
        'site/validate/order/setorder',
        this.sendData
      )
      // console.log(res)
      if(res.data.status===0){
        this.$message.success('订单提交成功，快来付钱吧！！！');
        // 去支付页 携带订单id
        this.$router.push(`/payMoney/${res.data.message.orderid}`)
      }
    }
  },
  // 注册组件
  components: { VDistpicker },
  // 获取数据
  async created() {
    // 获取路由的数据
    // console.log(this.$route);
    this.sendData.goodsids = this.$route.params.ids
    let res = await this.$http.get(
      `site/validate/order/getgoodslist/${this.sendData.goodsids}`
    )
    // console.log(res);
    // 自己处理购买个数
    res.data.message.forEach(v => {
      v.buycount = this.$store.state.goodsData[v.id]
      this.sendData.goodsAmount += v.buycount * v.sell_price
      this.totalCount += v.buycount
      // 为商品信息赋值
      this.sendData.cargoodsobj[v.id] = v.buycount
    })
    // 设置给data中的数据
    this.goodsList = res.data.message
  }
}
</script>

<style>
.my-form-item {
  width: 800px;
}
.my-span {
  color: gray;
  font-size: 12px;
}
</style>
