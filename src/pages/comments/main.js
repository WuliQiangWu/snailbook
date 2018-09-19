import Vue from 'vue'
import App from './comment'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '我的评论',
    enablePullDownRefresh: true
  }
}
