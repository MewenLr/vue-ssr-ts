import { storiesOf } from '@storybook/vue'
import svgIcon from '@/scripts/modules/svg-icon'
import AIcon from '@/components/atoms/a-icon/a-icon.vue'
import config from '@/components/atoms/a-icon/a-icon.dataset'

const { props } = config

svgIcon()

storiesOf('Atoms', module).add('AIcon', () => ({
  components: { AIcon },
  data: () => ({
    icon: props.icon,
    types: props.types,
  }),
  template: `
    <a-icon
      :icon="icon"
      :types="types"
    />
  `,
}))
