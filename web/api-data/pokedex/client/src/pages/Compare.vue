<template>
  <Wrapper>
    <div class="compare">
      <CompareContainer :pokemon="compareQueue[0]" :isEmpty="compareQueue.length < 1" />
      <CompareContainer :pokemon="compareQueue[1]" :isEmpty="compareQueue.length < 2" />
    </div>
  </Wrapper>
</template>

<script setup lang="ts">
import { Wrapper } from '../layouts';
import { CompareContainer } from '../components';
import { usePokemonStore } from '../store/pokemon';
import { storeToRefs } from 'pinia';

const store = usePokemonStore();
const { compareQueue } = storeToRefs(store);
</script>
