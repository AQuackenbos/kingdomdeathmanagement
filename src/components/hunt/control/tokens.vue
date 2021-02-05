<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Manage Tokens</p>
    </header>
    <section class="modal-card-body">
      <div v-if="tchanges.length === 0" class="content">Add Token Changes Below</div>
      <div v-for="(t,tidx) in tchanges" :key="tidx" class="mb-3">
        <b-field class="mb-0" grouped>
          <b-field>
            <b-dropdown class="has-text-left" v-model="t.change" aria-role="list" position="is-bottom-right" size="is-small">
              <button 
                type="button" 
                slot="trigger" 
                class="button is-small"
                :class="{ 'is-success': t.change === 'add', 'is-danger': t.change === 'remove', 'is-primary': t.change === null }"
              >
                <template v-if="t.change">
                    <b-icon :icon="t.change === 'add' ? 'plus-square' : 'minus-square'" class="mr-1" /><span>{{ capitalize(t.change) }}</span>
                </template>
                <template v-else>
                  <span>Change Type</span>
                </template>
              </button>
              <b-dropdown-item aria-role="listitem" v-for="s in ['add','remove']" :key="s" :value="s" >
                {{ capitalize(s) }}
              </b-dropdown-item>
            </b-dropdown>
          </b-field>
          <b-field expanded>
            <b-dropdown :disabled="t.change === null" class="has-text-left" v-model="t.type" aria-role="list" position="is-bottom-right" size="is-small">
              <button class="button is-dark is-small" type="button" slot="trigger">
                <template v-if="t.type">
                  <span>{{ tokenTypes().find(tt => tt.value === t.type).label }}</span>
                </template>
                <template v-else>
                  <span>Select Token Type</span>
                </template>
              </button>
              <b-dropdown-item aria-role="listitem" v-for="tt in tokenTypes()" :key="tt.value" :value="tt.value">
                {{ tt.label }}
              </b-dropdown-item>
            </b-dropdown>
          </b-field>
          <b-field expanded v-if="t.type === 'other'" label="Token Name" label-position="on-border">
            <b-input v-model="t.custom" size="is-small" />
          </b-field>
          <b-field :label="t.change ? capitalize(t.change) + ' Tokens' : ''" label-position="on-border">
            <b-numberinput :min="0" :disabled="t.change === null" controls-position="compact" v-model="t.amount" size="is-small" type="is-info" />
          </b-field>
          <b-field>
            <b-button icon-left="times" @click="remove(tidx)" size="is-small" type="is-danger" />
          </b-field>
        </b-field>
        <div class="token-label has-text-right mr-6 is-size-7">
          <span v-if="t.type">
            <div v-if="t.type === 'other'" class="field is-grouped">
              <span class="is-size-6">Current Special Tokens: </span>
              <span v-for="(ot,otidx) in huntTokens.other" :key="otidx" class="tags has-addons mr-1">
                <span class="tag is-dark is-clickable" @click="setCustomToken(tidx, ot.name)">{{ ot.name }}</span>
                <span class="tag is-primary">x{{ ot.amount }}</span>
              </span>
            </div>
            <span v-else>
              Current {{ tokenTypes().find(tt => tt.value === t.type).label }} Tokens: <strong>{{ tokenCount(t.type) }}</strong>
            </span>
          </span>
        </div>
        <hr class="mt-1 mb-1" />
      </div>
    </section>
    <footer class="modal-card-foot">
      <div class="buttons">
        <button class="button" type="button" @click="close">Cancel</button>
        <button class="button is-danger" @click="removeAll">Remove All Tokens</button>
        <button class="button is-info" @click="add">Add Token Change</button>
        <button class="button is-success" @click="done">Update Tokens</button>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.modal-card {
  height: 100%;
}

.modal-card-foot {
  .buttons {
    width: 100%;
    justify-content: flex-end;
  }
}

.token-label {
  .field {
    margin-top: .5em;
  }
  
  .tags, .tag {
    margin-bottom: 0 !important;
  }
}
</style>

<script>
export default {
  name: 'ManageTokens',
  props: {
    huntTokens: Object,
    tokenTypes: Function
  },
  data() {
    return {
      tchanges: [{ type: null, custom: null, change: null, amount: 0 }]
    }
  },
  methods: {
    tokenCount(type) {
      let [ tokenKey, modKey ] = type.split('_')
      return this.huntTokens[tokenKey][modKey]
    },
    
    setCustomToken(idx, name) {
      this.tchanges[idx].custom = name
    },
  
    add() {
      this.tchanges.push({ type: null, custom: null, change: null, amount: 0 })
    },
    
    remove(idx) {
      this.tchanges.splice(idx,1)
    },
    
    removeAll() {
      this.$buefy.dialog.confirm({
        message: 'This will remove ALL tokens, including custom tokens.  Are you sure?',
        onConfirm: () => {
          this.$emit('remove')
          this.$emit('close')
        }
      })
    },
  
    close() {
      this.$emit('close')
    },
    
    done() {
      this.$emit('done', this.tchanges)
      this.$emit('close')
    }
  }
}
</script>