<template>
  <div>
    <div class="details">
      <h1 class="name">{{ props.data?.name }}</h1>
      <h3>Type: {{ props.data?.types.join(' - ') }}</h3>
      <h3>Evolution: {{ data?.evolutionLevel }}</h3>
      <button @click="setEvolutionTab">See next evolution</button>
    </div>
    <div class="stats">
      <ul>
        <li v-for="stat in data?.stats" :key="stat.name">
          {{ stat.name }}: {{ stat.value }}
          <progress max="100" :value="stat.value" />
        </li>
      </ul>
    </div>
    <div class="battle-stats">
      <ul>
        <li>
          <span>Strengths:</span>
          <span>{{ createStatsArray(props.data?.types, 'strength').join(', ') }}</span>
        </li>
        <li>
          <span>Weakness:</span>
          <span>{{ createStatsArray(props.data?.types, 'weakness').join(', ') }}</span>
        </li>
        <li>
          <span>Resistant:</span>
          <span>{{ createStatsArray(props.data?.types, 'resistance').join(', ') }}</span>
        </li>
        <li>
          <span>Vulnerable:</span>
          <span>{{ createStatsArray(props.data?.types, 'vulnerable').join(', ') }}</span>
        </li>
      </ul>
      <button @click="addPokemon" class="add-pokemon">Add Pokemon</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { pokemonTypes } from '../utils';
import { pokemonTabs } from '../utils/constants';
import { currentPokemonType } from '../utils/types';
import { usePokemonStore } from '../store/pokemon';

const props = defineProps<{ data: currentPokemonType | undefined }>();
const store = usePokemonStore();

const setEvolutionTab = () => {
  store.setPokemonTab(pokemonTabs.evolution);
};

const addPokemon = () => {
  // store.dispatch('addPokemonToList', props.data);
};

const createStatsArray = (types: string[] | undefined, statType: string) => {
  const statsSet = new Set();
  types?.forEach((type: string) => {
    // @ts-ignore
    pokemonTypes[type][statType].forEach((stat: string) => {
      if (!statsSet.has(stat)) {
        statsSet.add(stat[0].toUpperCase() + stat.slice(1));
      }
    });
  });
  return Array.from(statsSet);
};

onMounted(() => {
  const progressBars = document.querySelectorAll('progress');
  progressBars.forEach((progressBar) => {
    (progressBar as HTMLElement).style.width = '10rem';
  });
});
</script>
