<template>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Add New Piece of Gear</p>
        </header>
        <section class="modal-card-body">
            <p class="content">
                A whole builder thinger.
            </p>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="close">Cancel</button>
            <button class="button is-success" v-if="valid" @click="select">Add Item</button>
            <b-button type="is-danger" disabled v-else>Item Has Errors</b-button>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'ResourceAdd',
    props: ['gear', 'campaign'],
    data() {
        return {
            item: {},
            nameInUse: false
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
            if(!this.valid) return
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