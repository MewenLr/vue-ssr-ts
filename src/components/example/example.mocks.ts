import config from '@/components/example/example.dataset'

import mock from '@/scripts/modules/mock-adapter'

export default [
  mock.onGet('https://jsonplaceholder.typicode.com/comments').reply(200, config.axios.getComments),
]
