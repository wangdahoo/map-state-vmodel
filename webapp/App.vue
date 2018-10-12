<template>
  <div>
    <input v-model="userName" />

    <p>{{ userName }}</p>
  </div>
</template>
<script>
import {mapStateVModel} from 'map-state-vmodel'

export default {
  computed: {
    ...mapStateVModel('user', [
      'userName'
    ])
  }
}
</script>
