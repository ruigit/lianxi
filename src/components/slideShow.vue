<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
      </a>
    </div>

    <ul class="slide-pages">
      <!--<li @click="goto(prevIndex)">&lt;</li>-->
      <li v-for="(item, index) in slides"
          @click="goto(index)" :class="{on: index === nowIndex}">
        <!--<a :class="{on: index === nowIndex}">{{ index + 1 }}</a>-->

      </li>
      <!--<li @click="goto(nextIndex)">&gt;</li>-->
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      slides: {
        type: Array,
        default: []
      },
      inv: {
        type: Number,
        default: 2000
      }
    },
    data () {
      return {
        nowIndex: 0,
        isShow: true
      }
    },
    computed: {
      // prevIndex () {
      //   if (this.nowIndex === 0) {
      //     return this.slides.length - 1
      //   }
      //   else {
      //     return this.nowIndex - 1
      //   }
      // },
      nextIndex () {
        if (this.nowIndex === this.slides.length - 1) {
          return 0
        }
        else {
          return this.nowIndex + 1
        }
      }
    },
    methods: {
      goto (index) {
        this.isShow = false
        setTimeout(() => {
          this.isShow = true
          this.nowIndex = index
        }, 10)
      },
      runInv () {
        this.invId = setInterval(() => {
          this.goto(this.nextIndex)
        }, this.inv)
      },
      clearInv () {
        clearInterval(this.invId)
      }
    },
    mounted () {
      this.runInv();
    }
  }
</script>

<style scoped>
  .slide-trans-enter-active {
    transition: all .5s;
  }
  .slide-trans-enter {
    transform: translateX(100%);
  }
  .slide-trans-old-leave-active {
    transition: all .5s;
    transform: translateX(-100%);
  }
  .slide-show {
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 200px;
    overflow: hidden;
    border: none;
  }
  .slide-img {
    width: 100%;
  }
  .slide-img img {
    width: 100%;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .slide-pages {
    position: absolute;
    bottom: 0;
    margin-bottom: 5px;
    right: 25%;
  }
  .slide-pages li {
    display: inline-block;
    margin: 0 5px;
    cursor: pointer;
    height: 10px;
    width: 20px;
    color: #000;
    font-size: 16px;
    border: 1px #000 solid;
  }
  .on {
    text-decoration: none;
    border: 1px red solid!important;
    background: red;
  }

</style>
