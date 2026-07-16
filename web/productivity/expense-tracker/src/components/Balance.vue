<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    total: string;
}>();

</script>

<template>
    <h4>Your Balance</h4>
    <h1 id="balance">${{ props.total }}</h1>
</template>