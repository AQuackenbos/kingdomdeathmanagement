<template>
  <div class="column is-12" v-if="!showLoading && user && campaign">
    <h1 class="title">Settlement Storage</h1>
    <section class="section">
      <b-tabs position="is-centered" class="block" size="is-medium" type="is-boxed" v-model="activeTab" @input="silentUpdateRoute" expanded>
        <b-tab-item v-for="t in tabs" :key="t.name" :label="t.name" :icon="t.icon">
          <component :is="t.component" />
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import Resources from '@/components/storage/resources'
import Gear from '@/components/storage/gear'
import GearGrids from '@/components/storage/grids'

export default {
  name: 'Storage',
  data() {
    return {
      activeTab: 0,
      tabs: [
        {
          name: 'Resources',
          route: 'tab-resources',
          path: '/storage/resources',
          icon: 'drumstick-bite',
          component: Resources
        },
        {
          name: 'Gear',
          route: 'tab-gear',
          path: '/storage/gear',
          icon: 'khanda',
          component: Gear
        },
        {
          name: 'Grids',
          route: 'tab-grids',
          path: '/storage/grids',
          icon: 'th',
          component: GearGrids
        }
      ]
    }
  },
  components: {
    Resources,
    Gear,
    GearGrids
  },
  created() {
    this.setRouterTab()
  },
  methods: {
    setRouterTab() {
      let t = this.$route.name;
      for(const o in this.tabs) {
        if(this.tabs[o].route === t) this.activeTab = parseInt(o)
      }
    },
    
    silentUpdateRoute() {
      history.pushState({}, null, this.tabs[this.activeTab].path)
    }
  }
}
</script>