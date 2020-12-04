<template>
    <div>
        <div v-if="innovation.flavor">
            <em>{{ innovation.flavor }}</em>
            <hr />
        </div>
        <div v-if="innovation.provides">
            (Provides...)
        </div>
        <div v-if="innovation.description" v-html="innovation.description" />
        <div v-if="innovation.increaseLimit">
            +1 Survival Limit
        </div>
        <div v-if="innovation.actions">
            <Action v-for="a in innovation.actions" :key="a.name" :action="a" />
        </div>
        <div v-if="innovation.build">
            Build area
        </div>
    </div>
</template>

<script>
import Action from '@/components/innovation/action'

export default {
    name: 'InnovationDescription',
    props: ['innovation'],
    components: {
        Action
    }
}
</script>