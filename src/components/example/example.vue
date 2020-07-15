<template lang="pug">
  .example
    a-image.example_image(
      source="example.jpg"
      placeholder="placeholder.png"
    )
    a-title.example_title(tag="h1") Example Component
    p.example_prop {{ msg }}
    p.example_computed {{ compMsg }}
    p.example_state(:test-attribute="`${stUrlExample}`") {{stUrlExample }}
    .example_list(
      v-for="user in list"
      :key="user.name"
    )
      | Name : {{ user.name }} | Age : {{ user.age }} |&nbsp;
      span.example_method Name and Age : {{ fullName(user) }}
    .example_comments(
      v-for="comment in comments"
      :key="comment.name"
    )
      | Name : {{ comment.name }} | Body : {{ comment.body }}
</template>

<script lang="ts">
import { namespace } from 'vuex-class'
import { TUserExample } from '@/scripts/types'
import { axGetComments } from '@/scripts/calls/ax-comments'
import { Component, Prop, Vue } from 'vue-property-decorator'
import axance from '@/scripts/modules/axance'
import AImage from '@/components/atoms/a-image/a-image.vue'
import ATitle from '@/components/atoms/a-title/a-title.vue'

const ModExample = namespace('ModExample')

@Component({
  name: 'Example',
  components: {
    AImage,
    ATitle,
  },
})

export default class Example extends Vue {

  // Props
  @Prop({ default: 'Default message' }) private msg!: string

  // Data
  private newUser: TUserExample | null = null
  private comments: object[] = []
  private list: object[] = [
    {
      name: 'Preetish',
      age: '26',
    },
    {
      name: 'John',
      age: '30',
    },
  ]

  // MapStates
  @ModExample.State
  public stUrlExample!: string

  // Computed
  get compMsg(): string {
    return `Computed ${this.msg.split(' ')[1]}`
  }

  // Hooks
  async mounted() {
    this.newUser = { name: 'patrick', age: '50' }
    try {
      const { data } = await axGetComments({ params: { postId: 1 } })
      this.comments = data
    } catch (e) {
      console.error(`[error] : ${e}`)
    }
  }

  // MapActions
  @ModExample.Action
  public actUrlExample!: (payload: string) => void

  // Methods
  public fullName(user: TUserExample): string {
    return `${user.name}-${user.age}`
  }

  public fetchApi(): Promise<{ data: object[] }> {
    return axance.get('/comments', { params: { postId: 1 } })
  }

  public updateUrlExample(updatedUrl: string): void {
    this.actUrlExample(updatedUrl)
  }

}
</script>
