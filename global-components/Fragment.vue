<script>
const freeze = (object, property, value) => {
  Object.defineProperty(object, property, {
    configurable: true,
    get: () => value,
    set: v => console.warn(`tried to set frozen property ${property} with ${v}`)
  })
}

const unfreeze = (object, property, value = null) => {
  Object.defineProperty(object, property, {
    configurable: true,
    writable: true,
    value
  })
}

export default {
  abstract: true,
  name: 'Fragment',
  props: {
    name: {
      type: String,
      default: () => Math.floor(Date.now() * Math.random()).toString(16)
    }
  },
  mounted() {
    const self = this
    const selfEl = self.$el
    const parentEl = selfEl.parentNode
    const props = self.$props

    const headEl = document.createComment(`fragment#${props.name}#head`)
    const tailEl = document.createComment(`fragment#${props.name}#tail`)

    parentEl.insertBefore(headEl, selfEl)
    parentEl.insertBefore(tailEl, selfEl)

    selfEl.appendChild = node => {
      parentEl.insertBefore(node, tailEl)
      freeze(node, 'parentNode', selfEl)
    }

    selfEl.insertBefore = (node, ref) => {
      parentEl.insertBefore(node, ref)
      freeze(node, 'parentNode', selfEl)
    }

    selfEl.removeChild = node => {
      parentEl.removeChild(node)
      unfreeze(node, 'parentNode')
    }

    Array.from(selfEl.childNodes).forEach(node => selfEl.appendChild(node))

    parentEl.removeChild(selfEl)

    freeze(selfEl, 'parentNode', parentEl)
    freeze(selfEl, 'nextSibling', tailEl.nextSibling)

    const insertBefore = parentEl.insertBefore
    parentEl.insertBefore = (node, ref) => {
      insertBefore.call(parentEl, node, ref !== selfEl ? ref : headEl)
    }

    const removeChild = parentEl.removeChild
    parentEl.removeChild = node => {
      if (node === selfEl) {
        while (headEl.nextSibling !== tailEl) {
          selfEl.removeChild(headEl.nextSibling)
        }

        parentEl.removeChild(headEl)
        parentEl.removeChild(tailEl)
        unfreeze(selfEl, 'parentNode')

        parentEl.insertBefore = insertBefore
        parentEl.removeChild = removeChild
      } else {
        removeChild.call(parentEl, node)
      }
    }
  },
  render(h) {
    const self = this
    const self$$slots = self.$slots
    const slotsDefault = self$$slots.default
    const props = self.$props

    // add fragment attribute on the children
    if (slotsDefault && slotsDefault.length) {
      slotsDefault.forEach(child => {
        child.data = {
          ...child.data,
          attrs: {
            fragment: props.name,
            ...(child.data || {}).attrs
          }
        }
      })
    }

    return h('div', { attrs: { fragment: props.name } }, slotsDefault)
  }
}
</script>
