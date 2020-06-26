import Vue from 'vue'
import debounce from '@/scripts/directives/debounce'
import lazyLoad from '@/scripts/directives/lazy-load'

const debounceDirective = Vue.directive('debounce', debounce)
const lazyLoadDirective = Vue.directive('lazy-load', lazyLoad)

export {
  debounceDirective,
  lazyLoadDirective,
}
