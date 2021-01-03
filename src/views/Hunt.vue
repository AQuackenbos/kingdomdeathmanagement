<template>
  <div class="column" v-if="!showLoading && user && campaign">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Hunt'
}
</script>