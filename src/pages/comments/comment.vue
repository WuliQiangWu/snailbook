<template>
  <div>
    <commentlist :type="type" :comments="comments"></commentlist>
  </div>
</template>

<script>
import {get} from '@/utils/index'
import commentlist from '@/components/commentlist'
export default {
  data () {
    return {
      comments: [],
      userInfo: {},
      type: 'user'
    }
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getUserComment()
      wx.hideNavigationBarLoading()

    },
    async getUserComment () {
      const comment = await get('/weapp/bookcomment', {openid: this.userInfo.openId})
      this.comments = comment.list
    }
  },
  onShow () {
    const userInfo = wx.getStorageSync('userinfo')
    if (userInfo) {
      this.userInfo = userInfo
    }
    this.init()
  },
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
  },
  components: {
    commentlist
  }
}
</script>

<style scoped>

</style>
