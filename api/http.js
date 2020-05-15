// export const base_url = 'https://autobid.demo.tianxiapai.com/oneday'   // 测试环境
export const base_url = 'https://www.yinianyiri.com'   // 正式环境

export function http(url, method, data, header) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: base_url + url,
      data,
      //现在的
      header: {
        'cookie': `JSESSIONID=${wx.getStorageSync('sessionId')};path=/oneday;HttpOnly`,
        ...header // 扩展运算符
      },
      method,
      success(res) {
        if (res.data.code === 0) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail(res) {
        reject(res)
      }
    })
  })
}