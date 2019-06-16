<template>
  <div class="center">
    <div class="el-row">
      <div class="el-col el-col-24">
        <div class="comp">
          <div class="goodsinfo routeanimate">
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
                  <div class="msg-tips">
                    <div class="icon">
                      <i class="iconfont icon-check"></i>
                    </div>
                    <div class="info">
                      <strong>订单已支付成功！</strong>
                      <p>您可以点击这里进入
                        <!-- <a href="/user/center/index.html"> -->
                        <router-link to="/user/order">会员中心</router-link>
                        <!-- </a> -->
                        查看订单状态！
                      </p>
                      <p>
                        <span class="sec">{{second}}</span> 秒后自动去首页
                      </p>
                      <p>如有其它问题，请立即与我们客服人员联系。</p>
                    </div>
                  </div>
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
export default {
  data() {
    return {
      second: 10,
      interId: 0
    }
  },
  created() {
    this.interId = setInterval(() => {
      this.second--
      if (this.second == 0) {
        clearInterval(this.interId)
        this.$router.push('/index')
      }
    }, 1000)
  },
  destroyed() {
    clearInterval(this.interId)
  }
}
</script>

<style>
.sec {
  color: yellowgreen;
  font-size: 30px;
  font-weight: 700;
}
</style>
