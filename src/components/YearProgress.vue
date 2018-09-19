<template>
  <div class="progressbar">
    <progress :percent="percent" activeColor="#ea5a49"></progress>
    <p>{{year}}已经过去了{{day}}天，{{percent}}%</p>
  </div>
</template>

<script>
  export default {
    name: 'YearProgress',
    methods: {
      isLeapYear () {
        const year = new Date().getFullYear()
        if (year % 400 === 0) {
          return true
        } else if (year % 4 === 0 && year % 100 !== 0) {
          return true
        } else {
          return false
        }
      },
      getDayOfYead () {
        return this.isLeapYear() ? 366 : 365
      }
    },
    computed: {
      year () {
        return new Date().getFullYear()
      },
      day () {
        let start = new Date()
        start.setMonth(0)
        start.setDate(1)
        // start 是今年第一天
        // 今天的时间戳减去今年第一天的时间戳
        let offset = new Date().getTime() - start.getTime()
        return parseInt(offset / 1000 / 60 / 60 / 24, 0) + 1
      },
      percent () {
        return (this.day / this.getDayOfYead() * 100).toFixed(2)
      }
    }
  }
</script>

<style scoped lang="scss">
  .progressbar{
    width: 100%;
    margin: 30rpx 0;
    font-size: 30rpx;
    text-align: center;
    p{
      margin-top: 25rpx;
    }
  }
</style>
