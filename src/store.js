//需要跳转前后的两个组件共同维护一个状态 is_new
//is_authenticated: 默认没有token的情况下是false 登录之后调用了loginAction() 改变了状态为True
//
export default {
  debug: true,
  state: {
    is_authenticated: window.localStorage.getItem('madblog-token') ? true : false,
    // 用户登录后，就算刷新页面也能再次计算出 user_id
    user_id: window.localStorage.getItem('madblog-token') ? JSON.parse(atob(window.localStorage.getItem('madblog-token').split('.')[1])).user_id : 0,
    // 用户登录后就算刷新也能再次计算出user_name
    user_name: window.localStorage.getItem('madblog-token') ? JSON.parse(atob(window.localStorage.getItem('madblog-token').split('.')[1])).user_name : '',
    // 用户登录后，就算刷新页面也能再次计算出 user_avatar
    // 后端传 URL 必须先用 base64 编码，所以这里还要多进行一次 atob 解码 base64 字符串
    user_avatar: window.localStorage.getItem('madblog-token') ? atob(JSON.parse(atob(window.localStorage.getItem('madblog-token').split('.')[1])).user_avatar) : ''
  },
  loginAction () {
    if (this.debug) { console.log('loginAction triggered') }
    this.state.is_authenticated = true
    // 解码 后端返回的token中包含很多信息
    const payload = JSON.parse(atob(window.localStorage.getItem('madblog-token').split('.')[1]))
    // 保存用户id
    this.state.user_id = payload.user_id
    // 保存用户名
    this.state.user_name = payload.user_name
    //来源url
    this.state.user_avatar = atob(payload.user_avatar)
  },
  logoutAction () {
    if (this.debug) console.log('logoutAction triggered')
    window.localStorage.removeItem('madblog-token')
    this.state.is_authenticated = false
    this.state.user_id = 0
    this.state.user_name = ''
    this.state.user_avatar = ''
  }
}
