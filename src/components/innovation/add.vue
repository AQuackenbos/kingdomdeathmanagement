<template>
    <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Add Innovation</p>
            <button type="button" class="delete" @click="close" />
        </header>
        <section class="modal-card-body">
            <p class="content">
                Select an Innovation to add to your Innovation Deck.
                <b-message type="is-warning">This list contains all innovations.</b-message>
            </p>
            <b-field label="Innovation" label-position="on-border">
                <b-select placeholder="Add Innovation" icon="flask" v-model="innovation" required expanded>
                    <option v-for="i in innovations" :key="i.id" :value="i.id">{{ i.name }}</option>
                </b-select>
            </b-field>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="close">Cancel</button>
            <button class="button is-success" @click="select">Add Innovation</button>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'AddInnovation',
    props: ['innovations', 'campaign'],
    data() {
        return {
            innovation: null
        }
    },
    methods: {
        select() {
            let i = this.innovation
            this.innovation = null
            this.$emit('add', i)
        },
        
        close() {
            this.innovation = null
            this.$emit('close')
        }
    }
}
</script>