import url from '@/scripts/helpers/urls'
import axance from '@/scripts/modules/axance'

export const axGetComments = (config?: object) => axance.get(`${url.comments}`, config)
