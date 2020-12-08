<template>
  <div>_GEAR</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'
db;
export default {
  name: 'Gear',
  props: ['campaign'],
  data() {
    return {
      gear: []
    }
  },
  computed: {
    ...mapGetters({
      loading: 'loading'
    })
  }
}
</script>