<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a class="selected" href="javascript:;">账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>

          <div id="loginform" name="loginform" class="login-box">
            <div class="input-box">
              <input
                id="txtUserName"
                name="txtUserName"
                type="text"
                placeholder="用户名/手机/邮箱"
                maxlength="50"
                v-model.trim="sendData.user_name"
              >
            </div>
            <div class="input-box">
              <input
                id="txtPassword"
                name="txtPassword"
                type="password"
                placeholder="输入登录密码"
                maxlength="16"
                v-model.trim="sendData.password"
              >
            </div>
            <div class="btn-box">
              <input id="btnSubmit" @click="login" name="btnSubmit" type="submit" value="立即登录">
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
      sendData: {
        user_name: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      // 接口调用
      let res = await this.$http.post('site/account/login', this.sendData)
      // console.log(res)
      if (res.data.status === 0) {
        // this.$message.success(res.data.message)
        // 去结算页
        // this.$router.push('/fillOrder')
        // 从哪来 回哪去
        this.$router.go(-1)
        // 修改仓库中的登录状态
        this.$store.commit('changeLogin', true)
      }
    }
  }
}
</script>

<style>
</style>
