<template lang="pug">
  .example
    a-image.example_image(
      source="example.jpg"
      placeholder="placeholder.png"
    )
    h1.example_title Example Component
    p.example_prop {{ msg }}
    p.example_computed {{ compMsg }}
    p.example_state(:test-attribute="`${apiClick}`") {{ apiClick }}
    .example_list(
      v-for="user in list"
      :key="user.name"
    )
      | Name : {{ user.name }} | Age : {{ user.age }} |&nbsp;
      span.example_list_method Name and Age : {{ fullName(user) }}
</template>

<script lang="ts">
import { namespace } from 'vuex-class'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { TUserExample } from '@/assets/scripts/contracts/types'
import AImage from '@/components/atoms/a-image/a-image.vue'

const endpoints = namespace('Endpoints')

@Component({
  name: 'Example',
  components: {
    AImage,
  },
})

export default class Example extends Vue {

  // Props
  @Prop({ default: 'primary' }) private msg!: string

  // Data
  private newUser: TUserExample | null = null
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
  @endpoints.State
  public apiClick!: string

  // Computed
  get compMsg(): string {
    return `Computed ${this.msg.split(' ')[1]}`
  }

  // Hooks
  mounted() {
    this.newUser = { name: 'patrick', age: '50' }
  }

  // Methods
  public fullName(user: TUserExample): string {
    return `${user.name}-${user.age}`
  }

}
</script>

<style lang="sass">
.example

  &_image
    width: auto
    height: 150px
</style>
