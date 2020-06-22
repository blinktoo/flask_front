import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import EditProfile from '@/components/EditProfile'
import Post from '@/components/Post'
import Ping from '@/components/Ping'

import store from '../store'

Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user/:id',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      // 用户修改自己的个人信息
      path: '/edit-profile',
      name: 'EditProfile',
      component: EditProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ping',
      name: 'Ping',
      component: Ping
    }
  ]
})

// to: 即将要进入的目标路由对象 from:当前导航正要离开的路由 next:一定要待用next来resolve这个钩子
router.beforeEach((to, from, next) => {
  // 获取localStorage中的token
  const token = window.localStorage.getItem('madblog-token')
  // 遍历路由对象中的meta属性里面的requireAuth
  if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }//将目的路由地址存入login的query中
    })
  } else if (token && to.name == 'Login') {
    // 用户已登录，但又去访问登录页面时不让他过去
    next({
      path: from.fullPath// 从哪来回哪去
    })
  } else if (to.matched.length === 0) {  // 要前往的路由不存在时
    console.log('here')
    console.log(to.matched)
    // 弹框提示，比较不理解的是这里为啥不用this.$toasted
    Vue.toasted.error('404: NOT FOUND', { icon: 'fingerprint' })
    if (from.name) {
      next({
        name: from.name// 存在来的路由
      })
    } else {// 不存在来的路由
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
