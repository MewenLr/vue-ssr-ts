import { DirectiveOptions } from 'vue'
import { TEventDirective } from '@/assets/scripts/contracts/types'

function debounceFunc(fn: Function, delay: number) {
  let timeout: any
  // let timeout: NodeJS.Timeout | undefined

  const debounced = function (this: Function, ...args: unknown[]) {
    const later = () => {
      timeout = undefined
      fn.apply(this, args)
    }

    clearTimeout(timeout)
    // clearTimeout(timeout as NodeJS.Timeout)
    timeout = setTimeout(later, delay)

    if (!timeout) return fn.apply(this, args)
    return false
  }

  return debounced
}

const directive: DirectiveOptions = {
  bind(el: TEventDirective, binding) {
    const { callback, debounce } = binding.value

    if (!debounce) return false

    const modifier = Object.keys(binding.modifiers)[0]
    el.eventModifiers = ['input', 'keyup'].includes(modifier) ? modifier : 'input' as string

    if (typeof callback !== 'function') {
      console.error(`[v-debounce] provided expression '${callback}' is not a function`)
      return false
    }

    const delay = parseInt(binding.arg as string, 10) || 300
    el.eventFn = debounceFunc((e: Error) => callback(e), delay)

    return el.addEventListener(el.eventModifiers, el.eventFn)
  },
  unbind: (el: TEventDirective) => el.removeEventListener(el.eventModifiers as string, el.eventFn as EventListener),
}

export default directive
