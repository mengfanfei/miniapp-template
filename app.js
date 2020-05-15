//app.js
import { promisifyAll } from 'miniprogram-api-promise'
import store from './store/index'
const wxp = {}
// promisify all wx's api
promisifyAll(wx, wxp)

wxp.getSystemInfo().then(res => {
  const ios = !!(res.system.toLowerCase().search('ios') + 1)
  store.data.ios = ios
  store.data.statusBarHeight = res.statusBarHeight
})

App({
  onLaunch: async function () {
    // 获取用户信息
    const settingRes = await wxp.getSetting()

    if(settingRes.authSetting['scope.userInfo']) {
      // 登录
      const loginRes = await wxp.login()
      
      const userInfoRes = await wxp.getUserInfo()

      console.log(loginRes, userInfoRes)

      // 可以将 userInfoRes 发送给后台解码出 unionId
      store.data.userInfo = userInfoRes.userInfo
      store.data.hasUserInfo = true

      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(userInfoRes)
      }

    } else {

    }
  },
  globalData: {}
})