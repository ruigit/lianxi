<template>
  <div id="hello">
    <h1 v-bind:title="title">{{ msg }}</h1>
    <ul>
      <li v-for="article in articles">
        {{article.title}}
      </li>
      <li>{{ msg.split('').reverse().join('') }}</li>
    </ul>
    <p>使用 v-html 指令：<span v-html="msg"></span></p>
    <button v-bind:disabled="false" v-for="item in list" @click="handleClick(item.id)">Button</button>
    <p v-if="seen">Now you see me</p>
    <a v-bind:href="url">改变连接</a>
    <form v-on:submit.prevent="onSubmit" @click="onSubmit()">提交表单</form>
    <p>初始 message 是："{{ msg }}"</p>
    <p>计算后的翻转 message 是："{{ reversedmsg }}"</p>
    <p>
      问一个答案是 yes/no 的问题：
      <input v-model="question">
    </p>
    <p>{{ answer }}</p>

  </div>
</template>

<script>
  import axios from 'axios'
  import lodash from 'lodash'
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js Appsssssss',
      articles: [],
      title: 'title content',
      list: [{id:1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}],
      seen: true,
      url: '111',
      question: '',
      answer: '你要先提出问题，我才能给你答案！'
    }
  },
  watch: {
    // 只要 question 发生改变，此函数就会执行
    question: function (newQuestion, oldQuestion) {
      this.answer = '等待输入停止……'
      this.getAnswer()
    }
  },
  mounted: function () {
    this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
      headers: {},
      emulateJSON: true
    }).then(function (response) {
      // 这里是处理正确的回调

      this.articles = response.data.subjects
      // this.articles = response.data["subjects"] 也可以

    }, function (response) {
      // 这里是处理错误的回调
      console.log(response)
    });
  },
  methods: {
    getAnswer: _.debounce(
      function () {
        if (this.question.indexOf('？') === -1) {
          this.answer = '问题通常需要包含一个中文问号。;-)'
          return
        }
        this.answer = '思考中……'
        var vm = this
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = '错误！API 无法处理。' + error
          })
      },
      // 这是用户停止输入操作后所等待的毫秒数。
      // （译者注：500毫秒之内，用户继续输入，则重新计时）
      500
    ),
    handleClick(id) {
      console.log(id)
    },
    onSubmit(){
      console.log('阻止重复提交')
    }
  },
  computed:{
    reversedmsg: function () {
      // `this` 指向 vm 实例
      return this.msg.split('').reverse().join('')
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
