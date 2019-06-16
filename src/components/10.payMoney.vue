<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-18">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{orderinfo.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{orderinfo.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{orderinfo.area+orderinfo.address}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{orderinfo.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{orderinfo.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                      <dd>{{orderinfo.message}}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="el-col el-col-6">
                <div id="container2">
                  <qrcode
                    :value="'http://111.230.232.110:8899/site/validate/pay/alipay/'+$route.params.orderid"
                    :options="{ width: 200 }"
                  ></qrcode>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 本地倒入 二维码
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default {
  data() {
    return {
      orderinfo: {},
      interId: 0
    }
  },
  components: {
    //[]让属性名也可以写表达式 会被正常解析
    [VueQrcode.name]: VueQrcode
  },
  async created() {
    let res = await this.$http.get(
      `site/validate/order/getorder/${this.$route.params.orderid}`
    )
    // console.log(res)
    this.orderinfo = res.data.message[0]

    // 使用定时器 间隔获取 订单状态
    this.interId = setInterval(async () => {
      let res = await this.$http.get(
        `site/validate/order/getorder/${this.$route.params.orderid}`
      )
      // console.log(res.data.message[0].status);
      if (res.data.message[0].status === 2) {
        // 清除定时器
        clearInterval(this.interId)
        // 弹框
        this.$message.success('支付成功')
        // 支付成功页
        this.$router.push('/paySuccess')
      }
    }, 1000)
    // 生成二维码 http://111.230.232.110:8899/site/validate/pay/alipay/${this.$route.params.orderid}
  },
  destroyed() {
    // 清除定时器
    clearInterval(this.interId)
  }
}
</script>

<style>
</style>
