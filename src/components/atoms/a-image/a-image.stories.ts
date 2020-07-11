import { storiesOf } from '@storybook/vue'
import AImage from '@/components/atoms/a-image/a-image.vue'
import config from '@/components/atoms/a-image/a-image.dataset'

const { props } = config

storiesOf('Atoms', module).add('AImage', () => ({
  components: { AImage },
  data: () => ({
    alt: props.alt,
    source: props.source,
    placeholder: props.placeholder,
  }),
  template: `
    <a-image
      :alt="alt"
      :source="source"
      :placeholder="placeholder"
    />
  `,
}))
