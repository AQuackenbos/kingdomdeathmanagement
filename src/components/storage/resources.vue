<template>
  <div>_RESOURCES</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'
db;
export default {
  name: 'Resources',
  props: ['campaign'],
  data() {
    return {
      resources: []
    }
  },
  computed: {
    ...mapGetters({
      loading: 'loading'
    })
  }
}
</script>