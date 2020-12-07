<template>
    <section class="content" style="width:100%">
        ACTION: {{ action.name }}
        <div class="field">
        <div class="field-body">
        <div class="field has-addons">
            <p class="control">
                <span class="button is-static">
                    <b-icon icon="asterisk" type="is-dark" size="is-small" />
                </span>
            </p>
            <p>
                a lot of content a lot of content a lot of content a lot of content a lot of content a lot of content a lot of content a lot of content a lot of content a lot of content a lot of content a lot of content a lot of content a lot of content a lot of content 
            </p>
        </div>
        </div>
        </div>
    </section>
</template>

<style lang="scss">
.brown {
    background: #9c6833 !important;
    color: #fff !important;
}

</style>
<script>
export default {
    name: 'Action',
    props: ['action']
}
</script>