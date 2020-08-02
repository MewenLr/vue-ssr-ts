/* eslint-disable-next-line */
import { DirectiveBinding } from 'vue/types/options'
import { TEventDirective } from '@/scripts/types'

export default {
  dragUp: {
    bind: (el: TEventDirective, binding: DirectiveBinding): void => {
      el.eventFn = (event) => binding.value(event)
      window.addEventListener('mouseup', el.eventFn)
      window.addEventListener('touchend', el.eventFn)
    },
    unbind: (el: TEventDirective): void => {
      window.removeEventListener('mouseup', el.eventFn as EventListener)
      window.removeEventListener('touchend', el.eventFn as EventListener)
    },
  },
  dragMove: {
    bind: (el: TEventDirective, binding: DirectiveBinding): void => {
      el.eventFn = (event) => binding.value(event)
      window.addEventListener('mousemove', el.eventFn)
      window.addEventListener('touchmove', el.eventFn)
    },
    unbind: (el: TEventDirective): void => {
      window.removeEventListener('mousemove', el.eventFn as EventListener)
      window.removeEventListener('touchmove', el.eventFn as EventListener)
    },
  },
  clickDown: {
    bind: (el: TEventDirective, binding: DirectiveBinding): void => {
      el.eventFn = (event) => binding.value(event)
      el.addEventListener('mousedown', el.eventFn)
      el.addEventListener('touchstart', el.eventFn)
    },
    unbind: (el: TEventDirective): void => {
      el.removeEventListener('mousedown', el.eventFn as EventListener)
      el.removeEventListener('touchstart', el.eventFn as EventListener)
    },
  },
  resizeCarousel: {
    bind: (el: TEventDirective, binding: DirectiveBinding): void => {
      el.eventFn = (event) => binding.value(event)
      window.addEventListener('resize', el.eventFn)
    },
    unbind: (el: TEventDirective): void => {
      window.removeEventListener('resize', el.eventFn as EventListener)
    },
  },
}
