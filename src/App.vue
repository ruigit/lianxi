<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <HelloWorld></HelloWorld>
    <slide-show :slides="slides"></slide-show>
    <div class="nav">
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <ul>
        <li><router-link to="/hello">Hello</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </div>
    <div class="main">
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import slideShow from './components/slideShow'
import Hello from './pages/hello'
import About from './pages/about'

export default {
  name: 'app',
  data () {
    return {
      slides: [
        {
          src: require('./assets/1.png'),
          href: 'xxx1',
        },
        {
          src: require('./assets/2.png'),
          href: 'xxx2',
        },
        {
          src: require('./assets/3.png'),
          href: 'xxx3',
        },
        {
          src: require('./assets/4.png'),
          href: 'xxx4',
        },
        {
          src: require('./assets/1.png'),
          href: 'xxx5',
        }
      ]
    }
  },
  components: {
    HelloWorld,
    slideShow,
    Hello,
    About
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  overflow: hidden;
}
.nav{
  width: 108px;
  margin: 10px auto;
}
.nav ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav ul li{
  width: 108px;
  height: 48px;
  line-height: 48px;
  border:1px solid #dadada;
  text-align: center;
}
.nav ul li a{
  text-decoration: none;
}
.main{

width: 100%;
  margin: 10px auto;
}
</style>
