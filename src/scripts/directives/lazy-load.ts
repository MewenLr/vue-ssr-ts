import { DirectiveOptions } from 'vue'

const directive: DirectiveOptions = {
  bind: (el: HTMLElement, binding) => {
    const picture = Array.from(el.children).find(
      (element) => /picture$/.test(element.classList.value),
    ) as HTMLImageElement

    if (!picture) {
      console.error('[v-lazy-load] provided component doesn\'t contain element with class \'picture\'')
      return false
    }

    if (typeof binding.value !== 'boolean') {
      console.error(`[v-lazy-load] provided expression '${binding.expression}' is not a boolean`)
      return false
    }

    if (Object.keys(binding.modifiers).length) console.warn('[v-lazy-load] doesn\'t accept modifiers')

    function loadImage() {
      if (picture) {
        picture.addEventListener('load', () => el.classList.add('image--loaded'))
        picture.addEventListener('error', () => console.error('[v-lazy-load] error eventlistener'))
        picture.src = picture.dataset.url as string
      }
    }

    function handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage()
          observer.unobserve(el)
        }
      })
    }

    function createObserver() {
      const options = { root: null, threshold: 0 }
      const observer = new IntersectionObserver(handleIntersect, options)
      observer.observe(el)
    }

    if (window.IntersectionObserver && binding.value) return createObserver()
    return /* ie11 || !lazy */ loadImage()
  },
  unbind: (el: HTMLElement) => {
    const picture = Array.from(el.children).find(
      (element) => /picture$/.test(element.classList.value),
    )
    if (picture) {
      picture.removeEventListener('load', () => el.classList.add('image--loaded'))
      picture.removeEventListener('error', () => console.error('[v-lazy-load] error eventlistener'))
    }
  },
}

export default directive
