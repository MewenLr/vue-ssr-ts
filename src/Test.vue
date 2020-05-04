<template>
  <div>
    <h1>Test Component of {{ name }}</h1>
    <div>Number : {{ number }}</div>
    <button @click="decrement">
      Decrement
    </button>
    <button @click="increment">
      Increment
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Hello extends Vue {
  @Prop({ default: 'Mewen' }) name!: string

  number: number = 1

  increment(): void {
    this.number += 1
  }

  decrement(): void {
    if (this.number > 1) this.number -= 1
  }
}
</script>

<style>

</style>
