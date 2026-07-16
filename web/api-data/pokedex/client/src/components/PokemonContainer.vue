<template>
  <div class="circle-container">
    <div class="outer-circle">
      <div class="inner-circle">
        <img :src="props.image" alt="" />
      </div>
      <div class="lines">
        <div class="line line-1"></div>
        <div class="line line-2"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  image: string;
}>();
</script>
