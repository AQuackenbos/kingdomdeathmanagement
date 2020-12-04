<template>
    <div>ACTION: {{ action.name }}</div>
</template>

<script>
export default {
    name: 'Action',
    props: ['action']
}
</script>