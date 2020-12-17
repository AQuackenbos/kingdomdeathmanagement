<template>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Add New Piece of Gear</p>
        </header>
        <section class="modal-card-body">
            <div class="columns is-multiline">
                <div class="column is-4">
                    <div v-if="item.type === 'armor' || grantsArmor">
                        <b-field label="Armor" label-position="on-border">
                            <b-input v-model="item.armor.amount" size="is-small" />
                        </b-field>
                        <b-field>
                            <b-select v-model="item.armor.location" size="is-small" placeholder="Location">
                                <option value="head"><span class="bl-head"></span> Head</option>
                            </b-select>
                        </b-field>
                    </div>
                </div>
                <div class="column is-4"></div>
                <div class="column is-4">
                    <b-field>
                        <b-dropdown v-model="item.type" aria-role="list">
                            <button class="button is-white" type="button" slot="trigger">
                                <template 
                            </button>
                        </b-dropdown>
                        <b-select placeholder="Item Type" icon="question-circle" v-model="item.type">
                            <option value="weapon">Weapon</option>
                            <option value="armor">Armor</option>
                            <option value="item">Other</option>
                        </b-select>
                    </b-field>
                    <b-field v-if="item.type === 'weapon'">
                        <b-input />
                    </b-field>
                </div>
                <div class="column is-4">left def</div>
                <div class="column is-4">
                    <div class="box gear-card">
                        <div class="contents">gear entry junk</div>
                    </div>
                </div>
                <div class="column is-4">right def</div>
                <div class="column is-12">bottom def</div>
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
    &::v-deep {/*
        .input.is-small {
            width: 3em
        }
    */}
}

.gear-card {
    border: 1px solid black;
}
</style>

<script>
export default {
    name: 'ResourceAdd',
    props: {
        gear: Array, 
        campaign: Object,
        item: {
            type: Object,
            default: () => { return { armor: {}, weapon: {}, classifications: [], keywords: [], description: '', bonuses: [] } }
        }
    },
    data() {
        return {
            nameInUse: false,
            grantsArmor: false,
            
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
        }
    }
}
</script>