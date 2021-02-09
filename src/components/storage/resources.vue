<template>
  <div class="tile is-ancestor resource-sheet">
    <div class="field corner-control">
      <b-switch v-model="showTrackers">Show Trackers</b-switch>
      <b-switch v-model="hideOos">Hide Out of Stock</b-switch>
    </div>
    <b-button type="is-info" icon-left="plus-square" class="corner-button" rounded @click.prevent="showAddResource = true">Add New Resource</b-button>
    <b-modal
      v-model="showAddResource"
      has-modal-card
      trap-focus
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-modal>
      <template #default="props">
        <ResourceAdd
          :categories="categoryNames"
          :names="existingNames"
          @close="props.close"
          @add="addResource"
        />
      </template>
    </b-modal>
    <div class="block" style="width:100%" v-if="categories.length === 0">
      <p class="content has-text-centered">No Resources have been added yet.</p>
    </div>
    <b-message title="Resource Trackers" v-model="showTrackers" :closable="false" type="is-info">
      <ul v-if="campaign.trackers && campaign.trackers.length">
        <li v-for="t in campaign.trackers" :key="t">
          <div class="control" style="margin-bottom:.25em">
            <span class="tags has-addons">
              <span class="tag is-dark" v-if="trackers.hasOwnProperty(t)">{{ trackers[t] }} x</span>
              <span class="tag is-dark" v-else>0 x</span>
              <span class="tag is-white">{{ t }}</span>
              <span class="tag is-danger" @click.prevent="removeTracker(t)" style="cursor:pointer">
                <b-icon icon="times"/>
              </span>
            </span>
          </div>
        </li>
      </ul>
      <p v-else class="content">No Trackers Configured</p>
      <b-button type="is-success" icon-left="thumbtack" @click.prevent="addTracker">Add Tracker</b-button>
    </b-message>
    <div class="tile is-vertical" v-for="(cg,idx) in [categoriesLeft,categoriesMiddle,categoriesRight]" :key="idx">
      <div class="tile is-parent" v-for="c in cg" :key="c.name" :ref="normalize(c.name)" style="position:relative">
        <div class="tile is-child box">
          <h1 class="subtitle">{{ c.name }}</h1>
          <hr />
          <table class="table is-striped is-fullwidth is-narrow is-hoverable">
            <tbody>
              <tr v-for="r in c.resources" :key="r.id">
                <td width="25%">
                  <b-field :type="r.qty > 0 ? 'is-info' : 'is-danger'" label="Qty" label-position="on-border">
                    <b-input
                      v-model="r.qty"
                      size="is-small"
                      type="number"
                      min="0"
                      class="is-info is-danger"
                      rounded
                      :lazy="true"
                      @blur="saveResource(r)"
                    />
                  </b-field>
                </td>
                <td style="text-align:left" :class="{ 'is-faded': r.qty <= 0 }">
                  <span>{{ r.name }}</span>
                </td>
                <td width="25%" :class="{ 'is-faded': r.qty <= 0 }">
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

<style lang="scss">
.resource-sheet {
  .corner-button {
    position: fixed;
    z-index: 10;
    bottom: 2em;
    right: 2em;
  }

  .corner-control {
    position: fixed;
    z-index: 10;
    bottom: 2em;
    left: 2em;
    
    .switch {
      display: flex;
    }
  }

  .tags .tag:not(:last-child) {
    margin-right: 0
  }

  .input.is-info.is-small.is-rounded {
    padding-right: 0
  }
  
  .is-faded {
    opacity: 0.5;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import { db, firebase } from '@/firebase'
import ResourceAdd from '@/components/storage/resource/add'

export default {
  name: 'Resources',
  data() {
    return {
      hideOos: false,
      showAddResource: false,
      showTrackers: false
    }
  },
  components: {
    ResourceAdd
  },
  computed: {
    ...mapGetters([
      'resources'
    ]),
    
    existingNames() {
      return this.resources
        .map(r => this.normalize(r.name))
        .filter((v,i,s) => s.indexOf(v) === i && v !== null)
    },
    
    categoryNames() {
      return this.resources
        .map(r => this.normalize(r.category))
        .filter((v,i,s) => s.indexOf(v) === i && v !== null)
        .map(r => r.split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' '))
        .sort()
    },
    
    categories() {
      let categories = []
      let names = this.categoryNames
      names.forEach(n => categories.push({
        name: n,
        resources: this.resources.filter(r => this.normalize(r.category) === this.normalize(n) && (this.hideOos ? r.qty > 0 : true))
      }))
      return categories.filter(c => c.resources.length > 0)
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
    },
    
    trackers() {
      let trackingData = {}
      this.campaign.trackers.forEach(t => {
        trackingData[t] = this.resources.filter(r => r.types.includes(this.normalize(t))).map(r => parseInt(r.qty)).reduce((a,b) => a + b, 0)
      })
      
      return trackingData
    }
  },
  methods: {    
    addResource(resource) {
      this.setLoading(true)
      db.collection(`campaigns/${this.campaign.id}/resources`).doc().set({
        name: resource.name.trim(),
        category: resource.category.trim(),
        types: resource.types.map(t => this.normalize(t)),
        description: (resource.description ? resource.description : null),
        flavor: (resource.flavor ? resource.flavor : null),
        qty: 0
      }).then(() => this.setLoading(false))
    },
    
    saveResource(resource) {
      let loading = this.$buefy.loading.open({ container: this.$refs[this.normalize(resource.category)].$el })
      db.collection(`campaigns/${this.campaign.id}/resources`).doc(resource.id).update({
        qty: resource.qty ? parseInt(resource.qty) : 0
      }).then(() => loading.close())
    },
    
    addTracker() {
      this.$buefy.dialog.prompt({
        message: 'Add a new resource tracker:',
        placeholder: 'i.e. bone, scrap, iron',
        trapFocus: true,
        onConfirm: (t) => db.collection('campaigns').doc(this.campaign.id).update({
            trackers: firebase.firestore.FieldValue.arrayUnion(this.normalize(t))
        })
      })
    },
    
    removeTracker(t) {
      db.collection('campaigns').doc(this.campaign.id).update({
        trackers: firebase.firestore.FieldValue.arrayRemove(t)
      })
    }
  }
}
</script>