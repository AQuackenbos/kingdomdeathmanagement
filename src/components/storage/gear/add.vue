<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Add New Piece of Gear</p>
    </header>
    <section class="modal-card-body">
      <div class="columns is-multiline">
        <div class="column is-4">
          <b-field grouped v-if="item.type === 'armor' || item.grants.armor">
            <b-field label="Armor" label-position="on-border">
              <b-input v-model="item.armor.amount" size="is-small" class="single-value" />
            </b-field>
            <b-field>
              <b-dropdown v-model="item.armor.locations" aria-role="list" position="is-bottom-right" size="is-small" multiple>
                <button class="button is-dark is-small" type="button" slot="trigger">
                  <template v-if="item.armor.locations.length > 0">
                    <div v-for="l in item.armor.locations" :key="l" style="margin-right:.5em">
                      <span :class="iconTranslation[l]" style="margin-right:.25em"></span>
                      <span>{{ l.charAt(0).toUpperCase() + l.slice(1) }}</span>
                    </div>
                  </template>
                  <template v-else>
                    <span>Select Armor Location(s)</span>
                  </template>
                </button>
                <b-dropdown-item :value="l" aria-role="listitem" v-for="l in ['all','head','body','arms','legs','waist']" :key="l">
                  <div class="media">
                    <div class="media-left">
                      <span :class="iconTranslation[l]"></span>
                    </div>
                    <div class="media-content">
                      {{ l.charAt(0).toUpperCase() + l.slice(1) }}
                    </div>
                  </div>
                </b-dropdown-item>
              </b-dropdown>
            </b-field>
          </b-field>
          <b-field grouped v-if="item.type === 'weapon' || item.grants.attack">
            <b-field label="Speed" label-position="on-border">
              <b-input v-model="item.weapon.speed" size="is-small" class="single-value" />
            </b-field>
            <b-field label="Accuracy" label-position="on-border">
              <b-input v-model="item.weapon.accuracy" size="is-small" class="single-value" />
            </b-field>
            <b-field label="Strength" label-position="on-border">
              <b-input v-model="item.weapon.strength" size="is-small" class="single-value" />
            </b-field>
          </b-field>
          <b-field label="Classifications" label-position="on-border" style="margin-top:.5em">
            <b-taginput
              v-model="item.classifications"
              icon="tag"
              placeholder="Add Classification"
              aria-close-label="Remove"
              size="is-small"
            />
          </b-field>
        </div>
        <div class="column is-4">
          <b-field label="Name" label-position="on-border">
            <b-input v-model="item.name" size="is-small" />
          </b-field>
          <b-select placeholder="Connection (Top)" v-model="item.connections.top" size="is-small">
            <option :value="null">None</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </b-select>
        </div>
        <div class="column is-4">
          <b-field grouped>
            <b-field>
              <b-dropdown v-model="item.type" aria-role="list" position="is-bottom-left">
                <button class="button is-dark is-small" type="button" slot="trigger">
                  <template v-if="item.type">
                    <span :class="iconTranslation[item.type]" style="margin-right:.25em"></span>
                    <span>{{ item.type.charAt(0).toUpperCase() + item.type.slice(1) }}</span>
                  </template>
                  <template v-else>
                    <span>Select a Type</span>
                  </template>
                </button>
                <b-dropdown-item :value="t" aria-role="listitem" v-for="t in ['weapon','armor','item']" :key="t">
                  <div class="media">
                    <div class="media-left">
                      <span :class="iconTranslation[t]"></span>
                    </div>
                    <div class="media-content">
                      {{ t.charAt(0).toUpperCase() + t.slice(1) }}
                    </div>
                  </div>
                </b-dropdown-item>
              </b-dropdown>
            </b-field>
            <b-field v-if="item.type === 'item'">
              <b-switch size="is-small" v-model="item.grants.attack">Attack</b-switch>
              <b-switch size="is-small" v-model="item.grants.armor">Armor</b-switch>
            </b-field>
          </b-field>
        </div>
        <div class="column is-4 side-conn">
          <b-field>
            <b-select placeholder="Connection (Left)" v-model="item.connections.left" size="is-small">
              <option :value="null">None</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
            </b-select>
          </b-field>
          <b-field label="Keywords" label-position="on-border" style="margin-top:.5em">
            <b-taginput
              v-model="item.keywords"
              icon="tag"
              placeholder="Add Classification"
              aria-close-label="Remove"
              size="is-small"
            />
          </b-field>
          <b-field label="Add Whole Affinities" label-position="on-border" style="margin-top:.5em">
            <b-taginput
              v-model="item.affinities"
              icon="square"
              placeholder="Add Affinity"
              aria-close-label="Remove"
              size="is-small"
              :before-adding="(t) => { return ['red','green','blue'].includes(t.toLowerCase()) }"
              :allow-duplicates="true"
            />
          </b-field>
        </div>
        <div class="column is-4">
          <GearCard :item="item" :campaign="campaign" />
        </div>
        <div class="column is-4 side-conn">
          <b-field>
            <b-select placeholder="Connection (Right)" v-model="item.connections.right" size="is-small">
              <option :value="null">None</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
            </b-select>
          </b-field>
          <b-field label="Description" label-position="on-border">
            <b-input type="textarea" v-model="item.description" size="is-small" />
          </b-field>
        </div>
        <div class="column is-4">
          <b-field label="Unlock Description" label-position="on-border">
            <b-input type="textarea" v-model="item.unlock.description" size="is-small"/>
          </b-field>
          <b-field label="Requirements" label-position="on-border">
            <b-taginput
              v-model="item.unlock.requires"
              icon="puzzle-piece"
              placeholder="Add Requirement"
              aria-close-label="Remove"
              size="is-small"
              :allow-duplicates="true"
              :open-on-focus="true"
              :data="filteredRequirements"
              @typing="getRequirements"
              autocomplete
            />
          </b-field>
          <b-field label="Sizing" label-position="on-border">
            <b-slider
              v-model="item.unlock.sizing"
              type="is-info"
              aria-label="Sizing"
              :min="0"
              :max="2"
              :tooltip="false"
              size="is-small"
            >
              <b-slider-tick :value="0">Small Req</b-slider-tick>
              <b-slider-tick :value="1">Large Req</b-slider-tick>
              <b-slider-tick :value="2">Separate Lines</b-slider-tick>
            </b-slider>
          </b-field>
        </div>
        <div class="column is-4">
          <b-select placeholder="Connection (Bottom)" v-model="item.connections.bottom" size="is-small">
            <option :value="null">None</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
          </b-select>
          <p class="content is-size-7">
            Description box replacement key:
            <b-field grouped>
              <div class="control">
                <b-taglist attached>
                  <b-tag type="is-light">[A]</b-tag>
                  <b-tag type="is-dark"><span class="bl-action"></span></b-tag>
                </b-taglist>
              </div>
              <div class="control">
                <b-taglist attached>
                  <b-tag type="is-light">[M]</b-tag>
                  <b-tag type="is-dark"><span class="bl-movement"></span></b-tag>
                </b-taglist>
              </div>
              <div class="control">
                <b-taglist attached>
                  <b-tag type="is-light">[E]</b-tag>
                  <b-tag type="is-dark"><span class="bl-endeavor"></span></b-tag>
                </b-taglist>
              </div>
              <div class="control">
                <b-taglist attached>
                  <b-tag type="is-light">[S]</b-tag>
                  <b-tag type="is-dark"><span class="bl-story-event"></span></b-tag>
                </b-taglist>
              </div>
            </b-field>
          </p>
        </div>
        <div class="column is-4">
          <b-field label="Action Description" label-position="on-border">
            <b-input type="textarea" v-model="item.action" size="is-small"/>
          </b-field>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="close">Cancel</button>
      <button class="button is-success" v-if="valid" @click="select">Add Item</button>
      <b-button type="is-danger" disabled v-else>Item Has Errors</b-button>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.input.is-info.is-small.is-rounded {
  padding-right: 0
}

.field {
  &::v-deep {
    .is-grouped {
      .label {
        text-overflow: inherit;
        left: 0;
        overflow: visible;
        max-width: none;
      }
    }
    .single-value {
      width: 3em;
      
      .input {
        text-align: center;
      }
    }
  }
}
</style>

<script>
import GearCard from '@/components/storage/gear/card'
import { defaultGearItem } from '@/util'

export default {
  name: 'GearAdd',
  components: {
    GearCard
  },
  props: {
    gear: Array,
    campaign: Object,
    item: {
      type: Object,
      default: () => { return defaultGearItem }
    }
  },
  data() {
    return {
      nameInUse: false,
      filteredRequirements: [
        'Red Affinity', 'Red Connection',
        'Blue Affinity', 'Blue Connection',
        'Green Affinity', 'Green Connection'
      ]
    }
  },
  computed: {
    valid() {
      return (
        !this.nameInUse &&
        (this.item.category !== null || this.item.category !== '') &&
        (this.item.name !== null || this.item.name !== '') &&
        (this.item.types && this.item.types.length > 0)
      )
    },
    
    iconTranslation() {
      return {
        'weapon': 'bl-nemesis-event',
        'armor': 'bl-armor',
        'item': 'bl-lantern',
        'all': 'bl-armor',
        'head': 'bl-head',
        'body': 'bl-body',
        'arms': 'bl-arms',
        'legs': 'bl-legs',
        'waist': 'bl-waist'
      }
    }
  },
  methods: {
    select() {
      if(!this.item || !this.valid) return
      let r = this.item
      this.item = {}
      this.$emit('add', r)
      this.$emit('close')
    },
    
    close() {
      this.item = {}
      this.$emit('close')
    },
    
    checkName() {
      let name = this.item.name.trim().toLowerCase()
      if(this.gear.map(r => r.name.trim().toLowerCase()).includes(name))
        this.nameInUse = true
      else
        this.nameInUse = false
    },
    
    getRequirements(t) {
      this.filteredRequirements = [
        'Red Affinity', 'Red Connection',
        'Blue Affinity', 'Blue Connection',
        'Green Affinity', 'Green Connection'
      ].filter(o => o.toLowerCase().includes(t.trim().toLowerCase()))
    }
  }
}
</script>