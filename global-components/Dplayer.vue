<template>
  <div class="dplayer">
    <button class="btn-show-player" v-show="!shouldShowPlayer" @click="showPlayer">
      点击加载播放器
    </button>
    <div v-if="shouldShowPlayer" ref="container" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: '',
      required: true,
    },
    screenshot: {
      type: Boolean,
      default: false,
    },
    subtitle: {
      type: String,
      default: '',
    },
    danmakuId: {
      type: String,
      default: '',
    },
    danmakuApi: {
      type: String,
      default: 'https://danmu.u2sb.top/api/danmu/dplayer/',
    },
    danmakuAddition: {
      type: String,
      default: '',
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: '#b7daff',
    },
    loop: {
      type: Boolean,
      default: false,
    },
    hotkey: {
      type: Boolean,
      default: true,
    },
    preload: {
      type: String,
      default: 'auto',
    },
    logo: {
      type: String,
      default: '',
    },
    mutex: {
      type: Boolean,
      default: true,
    },
    crossOrigin: {
      type: Boolean,
      default: false,
    },
    proxy: {
      type: String,
      default: 'https://cors-anywhere.herokuapp.com',
    },
  },
  data() {
    return {
      shouldShowPlayer: false,
    }
  },
  methods: {
    showPlayer() {
      this.shouldShowPlayer = true
      Promise.all([import(/* webpackChunkName: "dplayer" */ 'dplayer/dist/DPlayer.min.js')]).then(
        ([{ default: DPlayer }]) => {
          // eslint-disable-next-line
          new DPlayer({
            container: this.$refs.container,
            autoplay: this.autoplay,
            theme: this.theme,
            loop: this.loop,
            screenshot: this.screenshot,
            hotkey: this.hotkey,
            preload: this.preload,
            logo: this.logo,
            video: {
              url: this.crossOrigin ? `${this.proxy}/${this.src}` : this.src,
            },
            subtitle: {
              url: this.crossOrigin ? `${this.proxy}/${this.subtitle}` : this.subtitle,
              color: '#000000',
              fontSize: '25px',
              bottom: '2%',
            },
            danmaku: {
              id: this.danmakuId,
              api: this.danmakuApi,
              addition: [this.danmakuAddition],
            },
            mutex: this.mutex,
          })
        }
      )
    },
  },
}
</script>

<style lang="stylus" scoped>
button.btn-show-player
  margin-top .75rem
  border 2px solid #4dba87
  background-color #fff
  cursor pointer
  outline none
  border-radius 33px
  padding 5px 16px
  font-size 13px
  font-weight 700
  transition background-color .3s ease
  color #4dba87
</style>
