const path = require('path')
const r = (...args) => path.resolve(__dirname, ...args)

// Theme API.
module.exports = (options, ctx) => {
  const { themeConfig, siteConfig } = ctx

  // resolve algolia
  const isAlgoliaSearch =
    themeConfig.algolia ||
    Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
      base => themeConfig.locales[base].algolia
    )

  const enableSmoothScroll = themeConfig.smoothScroll === true

  return {
    alias() {
      return {
        '@AlgoliaSearchBox': isAlgoliaSearch
          ? r('components/AlgoliaSearchBox.vue')
          : r('noopModule.js')
      }
    },

    plugins: [
      ['@vuepress/active-header-links', options.activeHeaderLinks],
      '@vuepress/search',
      '@vuepress/nprogress',
      '@vuepress/pwa',
      '@vuepress/back-to-top',
      [
        'container',
        {
          type: 'tip',
          defaultTitle: {
            '/': 'TIP',
            '/zh/': '提示'
          }
        }
      ],
      [
        'container',
        {
          type: 'warning',
          defaultTitle: {
            '/': 'WARNING',
            '/zh/': '注意'
          }
        }
      ],
      [
        'container',
        {
          type: 'danger',
          defaultTitle: {
            '/': 'WARNING',
            '/zh/': '警告'
          }
        }
      ],
      [
        'container',
        {
          type: 'details',
          before: info =>
            `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
          after: () => '</details>\n'
        }
      ],
      [
        'container',
        {
          type: 'right',
          defaultTitle: ''
        }
      ],
      [
        'container',
        {
          type: 'theorem',
          before: info => `<div class="theorem"><p class="title">${info}</p>`,
          after: '</div>'
        }
      ],
      ['smooth-scroll', enableSmoothScroll]
    ]
  }
}
