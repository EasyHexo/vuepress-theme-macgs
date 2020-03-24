<template>
  <div class="bilibili">
    <iframe
      class="bbplayer"
      v-bind:src="src"
      allowfullscreen="allowfullscreen"
      scrolling="no"
      frameborder="0"
      sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups"
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    bvid: {
      type: String,
      default: null,
      required: true
    },
    page: {
      type: Number,
      default: 1,
      required: false
    },
    highQuality: {
      type: Boolean,
      default: false,
      required: false
    },
    danmaku: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      src: `//player.bilibili.com/player.html?bvid=${this.bvid}&page=${this.page}&high_quality=${
        this.highQuality ? 1 : 0
      }&danmaku=${this.danmaku}`
    }
  }
}
</script>

<style lang="stylus" scoped>
.bbplayer {
  width: 100%;
  height: 500px;
}
</style>