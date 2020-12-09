<template>
  <div class="tile is-ancestor">
    <b-button type="is-info" icon-left="plus-square" class="corner-button" rounded @click.prevent="showAddResource = true">Add New Resource</b-button>
    <b-modal
      v-model="showAddResource"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal>
      <template #default="props">
        <ResourceAdd 
          :resources="resources"
          :campaign="campaign"
          @close="props.close"
          @add="addResource"
        />
      </template>
    </b-modal>
    <div class="block" style="width:100%" v-if="categories.length === 0">
      <p class="content has-text-centered">No Resources have been added yet.</p>
    </div>
    <div class="tile is-vertical" v-for="(cg,idx) in [categoriesLeft,categoriesMiddle,categoriesRight]" :key="idx">
      <div class="tile is-parent" v-for="c in cg" :key="c.name">
        <div class="tile is-child box">
          <h1 class="subtitle">{{ c.name }}</h1>
          <hr />
          <table class="table is-striped is-fullwidth is-narrow is-hoverable">
            <tbody>
              <tr v-for="r in c.resources" :key="r.id">
                <td width="25%">
                  <b-field type="is-info" label="Qty" label-position="on-border">
                    <b-input 
                      v-model="r.qty" 
                      size="is-small"
                      type="number"
                      class="is-info"
                      rounded
                    />
                  </b-field>
                </td>
                <td style="text-align:left">
                  <span>{{ r.name }}</span>
                </td>
                <td width="25%">
                  <div class="control" style="width:100%">
                    <div class="tags">
                      <span class="tag is-rounded" v-for="t in r.types" :key="t" style="width:100%">{{ t }}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.corner-button {
  position: fixed;
  bottom: 2em;
  right: 2em;
}

.tags .tag:not(:last-child) {
  margin-right: 0
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'
import { db } from '@/firebase'
import ResourceAdd from '@/components/storage/resource/add'

export default {
  name: 'Resources',
  props: ['campaign'],
  data() {
    return {
      resources: [],
      showAddResource: false
    }
  },
  components: {
    ResourceAdd
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      currentCampaign: 'currentCampaign'
    }),
    
    existingNames() {
      return this.resources
        .map(r => r.name.trim().toLowerCase())
        .filter((v,i,s) => s.indexOf(v) === i && v !== null)
    },
    
    categoryNames() {
      return this.resources
        .map(r => r.category.trim().toLowerCase())
        .filter((v,i,s) => s.indexOf(v) === i && v !== null)
        .map(r => r.split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' '))
    },
    
    categories() {
      let categories = []
      let names = this.categoryNames
      names.forEach(n => categories.push({ name: n, resources: this.resources.filter(r => r.category.trim().toLowerCase() === n.trim().toLowerCase()) }))
      return categories
    },
    
    categoriesLeft() {
      return this.categories.filter((k,i) => {
        k;
        return i%3 === 0
      })
    },
    
    categoriesMiddle() {
      return this.categories.filter((k,i) => {
        k;
        return i%3 === 1
      })
    },
    
    categoriesRight() {
      return this.categories.filter((k,i) => {
        k;
        return i%3 === 2
      })
    }
  },
  created() {
    this.$bind('resources', db.collection(`campaigns/${this.currentCampaign}/resources`))
  },
  methods: {
    ...mapActions([
      'setLoading'
    ]),
    
    addResource(resource) {
      this.setLoading(true)
      db.collection(`campaigns/${this.currentCampaign}/resources`).doc().set({
        name: resource.name.trim(),
        category: resource.category.trim(),
        types: resource.types.map(t => t.toLowerCase().trim()),
        description: (resource.description ? resource.description : null),
        flavor: (resource.flavor ? resource.flavor : null),
        qty: 0
      }).then(() => this.setLoading(false))
    }
  }
}
</script>