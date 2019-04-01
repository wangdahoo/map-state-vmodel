<template>
  <div>
    <h4>example i: </h4>
    <input v-model="userName" /> {{ userName }}

    <h4>example ii: </h4>
    <div class="form-item">
      <label>mobile: </label> <input name="mobile" v-model="form.mobile" /> {{form.mobile}}
    </div>
    <div class="form-item">
      <label>password: </label> <input name="password" v-model="form.password" /> {{form.password}}
    </div>

    <h4>example iii (nested form): </h4>
    <div class="form-item">
      <label>foo: </label> <input name="mobile" v-model="nestedForm.foo" /> {{nestedForm.foo}}
    </div>
  </div>
</template>
<script>
import {mapStateVModel} from 'map-state-vmodel'

export default {
  computed: {
    ...mapStateVModel('user', [
      'userName',
      'form',
    ]),

    ...mapStateVModel('user/a/b', [
      'nestedForm'
    ])
  }
}
</script>
