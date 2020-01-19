<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-macgs-content" ref="content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <KeepAlive>
      <Comment class="theme-macgs-content__comment" :options="valine" />
    </KeepAlive>

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from './PageEdit.vue'
import PageNav from './PageNav.vue'
import Comment from './Comment.vue'

export default {
  components: { PageEdit, PageNav, Comment },

  props: ['sidebarItems'],

  computed: {
    valine() {
      return this.$site.themeConfig.valine || {}
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block
</style>
