<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Add New Resource</p>
    </header>
    <section class="modal-card-body">
      <p class="content">
        <b-field 
          label="Resource Name" 
          label-position="on-border"
          :type="{ 'is-danger': nameInUse }"
          :message="{ 'This resource is already recorded in this Settlement.': nameInUse }"
        >
          <b-input
            placeholder="Resource"
            type="text"
            :lazy="true"
            @input="checkName"
            v-model="resource.name"
            required
          />
        </b-field>
        <b-field
          label="Category"
          label-position="on-border"
          :type="{ 'is-danger': !resource.category }"
          :message="{ 'Required': !resource.category }"
        >
          <b-autocomplete
            v-model="resource.category"
            ref="category"
            :data="filteredCategoryNames"
            placeholder="i.e. Basic Resource, Strange Resource, White Lion, etc"
            @select="o => selected = o"
            type="text"
            required
          >
            <template #header>
              <span v-if="filteredCategoryNames.length === 0" @click="$refs.category.setSelected(resource.category)"><span class="tag is-info">New</span> {{ resource.category }}</span>
            </template>
          </b-autocomplete>
        </b-field>
        <b-field
          label="Types"
          label-position="on-border"
          :type="{ 'is-danger': resource.types && resource.types.length < 1 }"
          :message="{ 'At least one type is required.': resource.types && resource.types.length < 1 }">
          <b-taginput
            placeholder="i.e. bone, organ, consumable, etc"
            v-model="resource.types"
          />
        </b-field>
        <b-field
          label="Description"
          label-position="on-border"
          message="Optional"
        >
          <b-input
            type="textarea"
            v-model="resource.description"
          />
        </b-field>
        <b-field
          label="Flavor"
          label-position="on-border"
          message="Optional"
        >
          <b-input
            type="textarea"
            v-model="resource.flavor"
          />
        </b-field>
      </p>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="close">Cancel</button>
      <button class="button is-success" v-if="valid" @click="select">Add Resource</button>
      <b-button type="is-danger" disabled v-else>Form Has Errors</b-button>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
::v-deep {
  .dropdown-menu {
    text-align: left;
  }
}
</style>

<script>
export default {
  name: 'ResourceAdd',
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    names: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      resource: {},
      nameInUse: false
    }
  },
  computed: {
    valid() {
      return (
        !this.nameInUse &&
        (this.resource.category !== null || this.resource.category !== '') &&
        (this.resource.name !== null || this.resource.name !== '') &&
        (this.resource.types && this.resource.types.length > 0)
      )
    },
    
    filteredCategoryNames() {
      return this.categories.filter((option) => this.normalize(option).includes(this.normalize(this.resource.category)))
    }
  },
  methods: {
    select() {
      if(!this.valid) return
      let r = this.resource
      this.resource = {}
      this.$emit('add', r)
      this.$emit('close')
    },
    
    close() {
      this.resource = {}
      this.$emit('close')
    },
    
    checkName() {
      let name = this.normalize(this.resource.name)
      if(this.names.map(r => this.normalize(r)).includes(name))
        this.nameInUse = true
      else
        this.nameInUse = false
    }
  }
}
</script>