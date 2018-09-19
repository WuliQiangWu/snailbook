<template>
  <a :href="detailUrl">
    <div class="card">
      <div class="thumb" @click.stop="preview()">
        <img :src="book.image" class="image" mode="aspectFit">
      </div>
      <div class="detail">
        <div class="row text-primary">
          <div class="right">
            {{book.rating}} <rate :value="book.rating"></rate>
          </div>
          <div class="left ">
            {{book.title}}
          </div>
        </div>
        <div class="row">
          <div class="right">
            浏览量:{{book.count}}

          </div>
          <div class="left">
            {{book.authors}}

          </div>
        </div>
        <div class="row">
          <div class="right">
            添加人:{{book.user_info.nickName}}
          </div>
          <div class="left">
            {{book.publisher}}

          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import rate from '@/components/rate'
export default {
  props: ['book'],
  components: {
    rate
  },
  methods: {
    preview () {
      wx.previewImage({
        current: this.book.image,
        urls: [this.book.image]
      })
    }
  },
  computed: {
    detailUrl () {
      return '/pages/detail/main?id=' + this.book.id
    }
  }
}
</script>

<style lang="scss">
.card {
  padding: 5rpx;
  overflow: hidden;
  margin: 5rpx 0;
  .thumb{
    width: 120rpx;
    height: 120rpx;
    float: left;
    margin: 0 auto;
    overflow: hidden;
    .image{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .detail{
    margin-left: 100rpx;
    .row{
      font-size: 28rpx;
      line-height: 20px;
      margin-bottom: 3px;
      overflow: hidden;
    }
    .right{
      float: right;
    }
    .left{
      margin-right: 80px;
    }
  }
}
</style>
