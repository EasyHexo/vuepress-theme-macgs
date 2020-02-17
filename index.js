const { resolve } = require('path')
const r = path => resolve(__dirname, path)

// Theme API.
module.exports = (options, ctx) => ({
  alias() {
    const { themeConfig, siteConfig } = ctx
    // resolve algolia
    const isAlgoliaSearch =
      themeConfig.algolia ||
      Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
        base => themeConfig.locales[base].algolia
      )
    return {
      '@AlgoliaSearchBox': isAlgoliaSearch
        ? r('components/AlgoliaSearchBox.vue')
        : r('noopModule.js')
    }
  },

  plugins: [
    '@vuepress/active-header-links',
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
        defaultTitle: '',
      },
    ],
    [
      'container',
      {
        type: 'theorem',
        before: info => `<div class="theorem"><p class="title">${info}</p>`,
        after: '</div>',
      },
    ]
    // ['@vuepress/google-analytics', themeConfig.ga],
    // ['@vuepress/google-analytics', { 'ga': 'UA-130601883-3' }],
  ]
})
