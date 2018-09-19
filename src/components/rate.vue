<template>
  <div class='rating'>
    <span >☆☆☆☆☆</span>
    <div class="hollow" :style="style">★★★★★</div>

  </div>
</template>

<script>
  export default {
    name: 'rate',
    props: {
      value: {type: [Number, String], default: '0'}
    },
    computed: {
      style () {
        return `width:${this.value / 2}em`
      }
    }
  }
</script>

<style scoped lang='scss'>
  .rating{
    position: relative;
    display: inline-block;
    .hollow{
      position: absolute;
      display: inline-block;
      top: 0;
      left: 0;
      width: 0;
      overflow: hidden;
    }
  }
</style>
