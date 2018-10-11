<template>
  <div>
    <input v-model="userName" />

    <p>{{ userName }}</p>
  </div>
</template>
<script>
import {mapStateVModel} from '../src/index'

export default {
  computed: {
    ...mapStateVModel('user', [
      'userName'
    ])
  }
}
</script>
