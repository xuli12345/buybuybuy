<template>
  <div class="bg-wrap" style="min-height: 765px;">
    <div class="sub-tit">
      <a href="javascript:void(0)" class="add">
        <i class="iconfont icon-reply"></i>返回
      </a>
      <ul>
        <li class="selected">
          <a href="javascript:;">查看订单</a>
        </li>
      </ul>
    </div>
    <div class="order-progress">
      <ul>
        <li :class="{active:orderinfo.status>=1}" class="first">
          <div class="progress">下单</div>
          <div class="info">{{orderinfo.add_time | formatTime}}</div>
        </li>
        <li :class="{active:orderinfo.status>=2}" class>
          <div class="progress">已付款</div>
          <div class="info">{{orderinfo.payment_time | formatTime}}</div>
        </li>
        <li :class="{active:orderinfo.status>=3}" class>
          <div class="progress">已经发货</div>
          <div class="info">{{orderinfo.express_time | formatTime}}</div>
        </li>
        <li :class="{active:orderinfo.status>=4}" class="last">
          <div class="progress">已完成</div>
          <div class="info">{{orderinfo.complete_time | formatTime}}</div>
        </li>
      </ul>
    </div>
    <div class="form-box accept-box form-box1">
      <dl class="head form-group">
        <dd>
          订单号：{{orderinfo.order_no}}
          <!-- <a href="#/site/goods/payment/12" class="btn-pay"> -->
          <router-link
            v-if="orderinfo.status===1"
            class="btn-pay"
            :to="'/payMoney/'+orderinfo.id"
          >去付款</router-link>
          <!-- 签收按钮 -->
          <el-button
            v-if="orderinfo.status===2"
            @click="completeOrder"
            type="success"
            class="btn-pay"
          >签收</el-button>
          <!-- </a> -->
          <!---->
        </dd>
      </dl>
      <dl class="form-group">
        <dt>订单状态：</dt>
        <dd>{{orderinfo.statusName}}</dd>
      </dl>
      <dl class="form-group">
        <dt>快递单号：</dt>
        <dd>{{orderinfo.express_no}}</dd>
      </dl>
      <dl class="form-group">
        <dt>支付方式：</dt>
        <dd>{{orderinfo.paymentTitle}}</dd>
      </dl>
    </div>
    <div class="table-wrap">
      <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
        <tbody>
          <tr>
            <th align="left">商品信息</th>
            <th width="60%">名称</th>
            <th width="10%">单价</th>
            <th width="10%">数量</th>
            <th width="10%">金额</th>
          </tr>
          <tr v-for="item in goodslist">
            <td width="60">
              <img :src="item.imgurl" class="img">
            </td>
            <td align="left">
              <a target="_blank" href="/goods/show-92.html">{{item.goods_title}}</a>
            </td>
            <td align="center">
              <s>￥{{item.goods_price}}</s>
              <p>￥{{item.real_price}}</p>
            </td>
            <td align="center">{{item.quantity}}</td>
            <td align="center">￥{{item.quantity*item.real_price}}</td>
          </tr>
          <tr>
            <td colspan="7" align="right">
              <p>
                商品金额：
                <b class="red">￥{{orderinfo.payable_amount}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                <b class="red">￥{{orderinfo.express_fee}}</b>
              </p>
              <p style="font-size: 22px;">
                应付总金额：
                <b class="red">￥{{orderinfo.order_amount}}</b>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="form-box accept-box">
      <dl class="head form-group">
        <dd>收货信息</dd>
      </dl>
      <dl class="form-group">
        <dt>顾客姓名：</dt>
        <dd>{{orderinfo.accept_name}}</dd>
      </dl>
      <dl class="form-group">
        <dt>送货地址：</dt>
        <dd>{{orderinfo.area+orderinfo.address}}</dd>
      </dl>
      <dl class="form-group">
        <dt>联系电话：</dt>
        <dd>{{orderinfo.mobile}}</dd>
      </dl>
      <dl class="form-group">
        <dt>电子邮箱：</dt>
        <dd>{{orderinfo.email}}</dd>
      </dl>
      <dl class="form-group">
        <dt>备注留言：</dt>
        <dd>{{orderinfo.message}}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderinfo: {},
      goodslist: []
    }
  },
  methods: {
    async completeOrder() {
      let res = await this.$http.get(
        `site/validate/order/complate/${this.orderinfo.id}`
      )
      // console.log(res);
      // 签收成功 重新获取数据
      this.getOrderInfo()
    },
    async getOrderInfo() {
      // 获取订单id
      let orderid = this.$route.params.orderid

      // 查询详细信息
      let res = await this.$http.get(
        `site/validate/order/getorderdetial/${orderid}`
      )
      // console.log(res);
      this.orderinfo = res.data.message.orderinfo
      this.goodslist = res.data.message.goodslist
    }
  },
  created() {
    this.getOrderInfo()
  }
}
</script>
<style>
</style>
