# map-state-vmodel
> mapState for v-model

### Install

```bash
$ npm i map-state-vmodel
```

### How to Use

* in *.vue

```vue
<template>
  <div>
    <input v-model="userName" />
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
```

* in store file `user.js`

```js
import {createSetters} from 'map-state-vmodel'

const state = {
  userName: 'wangdahoo'
}

const mutations = {
  ...createSetters(state)
}

const getters = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}

```

That's it.
