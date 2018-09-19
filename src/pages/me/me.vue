<template>
  <div class="container">
    <div class="userinfo" @click='login'>
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>

    <button v-if='userinfo.openId' @click="scanBook()" class='btn'>添加图书</button>
    <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>


  </div>
</template>
<script>
  import qcloud from 'wafer2-client-sdk'

  import config from '@/config/config'
  import {showSuccess, post, showModal} from '@/utils/index'
  import YearProgress from '@/components/YearProgress'

  export default {
    data () {
      return {
        userinfo: {
          avatarUrl: '../../../static/img/me.png',
          nickName: ''
        },
        canIUse: wx.canIUse('button.open-type.getUserInfo')
      }
    },
    methods: {
      async addBook (isbn) {
        const result = await post('/weapp/addbook', {
          isbn,
          openid: this.userinfo.openId
        })
        if (result.code === 0 && result.title) {
          showModal('添加成功', `${result.title}添加成功`)
        }
      },
      scanBook () {
        wx.scanCode({
          success: (res) => {
            if (res.result) {
              this.addBook(res.result)
            }
          }
        })
      },
      login () {
        let user = wx.getStorageSync('userinfo')
        if (!user) {
          qcloud.setLoginUrl(config.loginUrl)
          let self = this
          qcloud.login({
            success: function (userinfo) {
              showSuccess('登陆成功')
              qcloud.request({
                url: config.userUrl,
                login: true,
                success (userRes) {
                  showSuccess('登录成功')
                  wx.setStorageSync('userinfo', userRes.data.data)
                  self.userinfo = userRes.data.data
                }
              })
            }
          })
        }
      }
    },
    onShow () {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
      }
    },
    components: {
      YearProgress
    }
  }
</script>

<style lang="scss">
  .container {
    padding: 0 30rpx;
    width: 100%;
    .userinfo {
      margin-top: 100rpx;
      text-align: center;
      font-size: 30rpx;
      width: 100%;
      img {
        width: 150rpx;
        height: 150rpx;
        margin: 20rpx;
        border-radius: 50%;
      }
    }
    .btn{
      margin-top: 10rpx;
      width: 100%;
    }
  }
</style>
