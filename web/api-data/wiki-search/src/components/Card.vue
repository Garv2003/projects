<script setup lang="ts">
const props = defineProps(['result']);

</script>

<template>
    <div class="result">
        <h3>{{ props.result.title }}</h3>
        <p v-html="props.result.snippet"></p>
        <a :href="'https://en.wikipedia.org/?curid=' + props.result.pageid" target="_blank">Read more</a>
    </div>
</template>

<style scoped></style>