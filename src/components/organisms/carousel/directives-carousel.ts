import { TEventDirective } from '@/scripts/types'
import { DirectiveBinding } from 'vue/types/options'

export default {
  dragUp: {
    bind: (el: TEventDirective, binding: DirectiveBinding) => {
      el.eventFn = (event) => binding.value(event)
      window.addEventListener('mouseup', el.eventFn)
      window.addEventListener('touchend', el.eventFn)
    },
    unbind: (el: TEventDirective) => {
      window.removeEventListener('mouseup', el.eventFn as EventListener)
      window.removeEventListener('touchend', el.eventFn as EventListener)
    },
  },
  dragMove: {
    bind: (el: TEventDirective, binding: DirectiveBinding) => {
      el.eventFn = (event) => binding.value(event)
      window.addEventListener('mousemove', el.eventFn)
      window.addEventListener('touchmove', el.eventFn)
    },
    unbind: (el: TEventDirective) => {
      window.removeEventListener('mousemove', el.eventFn as EventListener)
      window.removeEventListener('touchmove', el.eventFn as EventListener)
    },
  },
  clickDown: {
    bind: (el: TEventDirective, binding: DirectiveBinding) => {
      el.eventFn = (event) => binding.value(event)
      el.addEventListener('mousedown', el.eventFn)
      el.addEventListener('touchstart', el.eventFn)
    },
    unbind: (el: TEventDirective) => {
      el.removeEventListener('mousedown', el.eventFn as EventListener)
      el.removeEventListener('touchstart', el.eventFn as EventListener)
    }
  },
}
