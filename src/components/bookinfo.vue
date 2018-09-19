<template>
    <div class="bookInfo">
      <div class="thumb">
        <img :src="info.image" alt="" mode="aspectFill" class="back">
        <img :src="info.image" alt="" mode="aspectFit" class="img">
        <div class="info">
          <div class="title">
            {{info.title}}
          </div>
          <div class="author">
            {{info.authors}}
          </div>
        </div>

      </div>
      <div class="detail">
        <img :src="userinfo.image" class='avatar' mode='aspectFit'>
        {{userinfo.nickName}}
        <div class="right text-primary">
          {{info.rating}}分
          <Rate :value='info.rating'></Rate>
        </div>
      </div>
      <div class="detail">
        {{info.publisher}}
        <div class="right">
          {{info.price}}
        </div>
      </div>
      <div class="tags">
        <div class="badge" :key='tag' v-for='tag in info.tags'>{{tag}}</div>
      </div>
      <div class="summary">
        <p :key='i' v-for='(sum,i) in info.summary'>{{sum}}</p>
      </div>
    </div>
</template>

<script>
  import Rate from '@/components/rate'
  export default {
    props: ['info'],
    computed: {
      userinfo () {
        return this.info.user_info || {}
      }
    },
    components: {
      Rate
    }
  }
</script>

<style scoped lang="scss">
.bookInfo {
  font-size: 28rpx;
  .badge{
    display: inline-block;
    margin:5px;
    padding:5px;
    border-radius: 10px;
    border:1px #EA5A49 solid;
    color:#EA5A49;
  }
  .summary{
    padding:0 15px;
    margin-top:10px;
    p{
      text-indent: 2em;
      font-size:14px;
    }
  }

  .right{
    float: right;
  }
  .detail{
    padding:5px 10px;
    .avatar{
      width:40rpx;
      height:40rpx;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .thumb{
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .back{
      filter: blur(15px);
      width: 100%;
    }
    .img{
      position: absolute;
      height: 300rpx;
      width: 100%;
      left: 0;
      top: 30rpx;
    }
    .info{
      color:white;
      position: absolute;
      width:100%;
      left:0;
      top:330rpx;
      text-align: center;
      .title{
        font-size:20px;
      }
      .author{
        font-size: 14px;
      }
    }
  }
}
</style>
