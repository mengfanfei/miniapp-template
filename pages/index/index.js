import create from '../../utils/create'
import store from '../../store/index'

//获取应用实例
const app = getApp()

create.Page(store, {
  use: [
    'userInfo',
    'hasUserInfo'
  ],
  computed: {
  },
  onLoad: function () {
    if (!this.store.data.hasUserInfo) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      // 在这里调用需要登录的接口， 不需要的登录的接口可以直接写在if外面
      app.userInfoReadyCallback = res => {
        this.store.data.userInfo = res.userInfo
        this.store.data.hasUserInfo = true
      }
    }


    const handler = function (evt) {
      console.log(evt)
    }
    store.onChange(handler)

    //store.offChange(handler)

  },
  getUserInfo: function (e) {
    this.store.data.userInfo = e.detail.userInfo
    this.store.data.hasUserInfo = true

  }
})
