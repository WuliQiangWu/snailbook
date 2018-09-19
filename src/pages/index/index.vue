<template>
  <div class="wrapper">
    <swiper :topBook="topList"></swiper>
    <card v-for="book in bookList" :key="book.id" :book="book"></card>
    <p class="text-center" v-if="!more">没有更多数据</p>
  </div>
</template>

<script>
  import {get} from '@/utils/index'
  import card from '@/components/card'
  import swiper from '../../components/swiper'

  export default {
    data () {
      return {
        bookList: [],
        page: 0,
        more: true,
        topList: []
      }
    },
    methods: {
      async getBook (init) {
        if (init) {
          this.page = 0
          this.more = true
        }
        wx.showNavigationBarLoading()
        let booklist = await get('/weapp/booklist', {page: this.page})
        if (booklist.data.length < 10 && this.page > 0) {
          this.more = false
        }
        if (init) {
          this.bookList = booklist.data
          wx.stopPullDownRefresh()
        } else {
          this.bookList = [...this.bookList, ...booklist.data]
        }
        wx.hideNavigationBarLoading()
      },
      async getTop () {
        const tops = await get('/weapp/top')
        this.topList = tops
      }
    },
    mounted () {
      this.getBook(true)
      this.getTop()
    },
    onPullDownRefresh () {
      this.getBook(true)
    },
    onReachBottom () {
      if (!this.more) {
        return false
      } else {
        this.page += 1
        this.getBook(false)
      }
    },
    components: {
      card, swiper
    }
  }
</script>

<style scoped lang="scss">
.wrapper{
  width: 100%;
  height: 100%;
  padding: 0 0 10rpx 0;
  .text-center{
    text-align: center;
    font-size: 24rpx;
  }
}
</style>
