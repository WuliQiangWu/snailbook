<template>
  <div>
    <book-info :info="detail"></book-info>
    <comment-list :comments = 'comments'></comment-list>
    <div v-if="comments.length <= 0"  class="comment">
      <textarea v-model='comment'
              class='textarea'
              :maxlength='100'
              placeholder='请输入图书短评'></textarea>
      <div class='location'>
        地理位置：
        <switch color='#EA5A49' :checked='location' @change='getGeo'></switch>
        <span class='text-primary'>{{location}}</span>
      </div>
      <div class='phone'>
        手机型号：
        <switch color='#EA5A49' :checked='phone' @change='getPhone'></switch>
        <span class='text-primary'>{{phone}}</span>
      </div>
      <div>
        <button class="btn" @click="addComment">评论</button>
      </div>
    </div>
    <button class="btn" open-type="share">转发给好友</button>
  </div>
</template>

<script>
import {get, post} from '@/utils/index'
import bookInfo from '@/components/bookinfo'
import commentList from '@/components/commentlist'

export default {
  data () {
    return {
      book_id: '',
      detail: [],
      comment: '',
      location: '',
      phone: '',
      userInfo: {},
      comments: {}
    }
  },
  methods: {
    async addComment () {
      let data = {
        comment: this.comment,
        location: this.location,
        phone: this.phone,
        openid: this.userInfo.openId,
        bookid: this.book_id
      }
      let res = await post('/weapp/addcomment', data)
      if (res.code === 0) {
        this.getcomment()
      }
    },
    async getdetail () {
      let detail = await get('/weapp/bookDetail', {id: this.book_id})
      wx.setNavigationBarTitle({
        title: detail.title
      })
      this.detail = detail
    },
    async getcomment () {
      let bookcomments = await get('/weapp/bookcomment', {id: this.book_id})
      this.comments = bookcomments.list
    },
    getGeo (e) {
      const ak = 'XzlW2Pdpl24wg6WfVtjhZEPQm8Mc03jj'
      let baiduUrl = 'http://api.map.baidu.com/geocoder/v2/'

      if (e.target.value) {
        wx.getLocation({
          success: (go) => {
            wx.request({
              url: baiduUrl,
              data: {
                location: `${go.latitude},${go.longitude}`,
                output: 'json',
                ak: ak
              },
              success: res => {
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知地点'
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        this.phone = phoneInfo.model
      } else {
        // 没选中
        this.phone = ''
      }
    }
  },
  mounted () {
    this.book_id = this.$root.$mp.query.id
    this.userInfo = wx.getStorageSync('userinfo')
    this.getdetail()
    this.getcomment()
  },
  components: {
    bookInfo, commentList
  }
}
</script>

<style scoped lang="scss">
  .comment{
    font-size: 28rpx;
    margin-top:10px;
    .btn{
      margin-bottom: 20rpx;
      width: 90%;
    }
    .textarea{
      width:730rpx;
      height:200rpx;
      background:#eee;
      padding:10rpx;
    }
    .location{
      margin-top:10px;
      padding:5px 10px;
    }
    .phone{
      margin-top:10px;
      padding:5px 10px;

    }
  }
</style>
