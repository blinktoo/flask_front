<template>
  <section>
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-light" style="margin-bottom: 20px;">
        <router-link to="/" class="navbar-brand">
          <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
          BlinkBlog
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <router-link to="/" class="nav-link">主页 <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Explore</a>
            </li>
          </ul>

          <!-- 搜索区域 -->
          <form class="form-inline navbar-left mr-auto">
            <input class="form-control mr-sm-2" type="search" placeholder="Search">
            <!-- 暂时先禁止提交，后续实现搜索再改回 type="submit" -->
            <button class="btn btn-outline-success my-2 my-sm-0" type="button">搜搜</button>
          </form>

          <ul v-if="sharedState.is_authenticated" class="nav navbar-nav navbar-right">
            <li class="nav-item">
              <a class="nav-link disabled" href="#">消息</a>
            </li>
            <li class="nav-item">
              <router-link v-bind:to="{ name: 'Profile', params: { id: sharedState.user_id }}" class="nav-link">简介</router-link>
            </li>
            <li class="nav-item">
              <a v-on:click="handlerLogout" class="nav-link" href="#">Logout</a>
            </li>
          </ul>
          <ul v-else class="nav navbar-nav navbar-right">
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
    import store from '../store.js'

    export default {
        name: 'Navbar',  //this is the name of the component
        data () {
            return {
                sharedState: store.state
            }
        },
        methods: {
            // 构建组件的方法
            handlerLogout (e) {
                store.logoutAction()
                this.$router.push('/login')
            }
        }
    }
</script>
