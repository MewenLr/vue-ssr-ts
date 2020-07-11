import url from '@/scripts/helpers/urls'
import axance from '@/scripts/modules/axance'

/* eslint-disable-next-line */
export const axGetComments = (config?: object) => axance.get(`${url.comments}`, config)
