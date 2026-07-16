<template>
  <div class="compare-container">
    <div v-if="isEmpty" class="empty">
      <button @click="navigateToSearch">
        <Plus />
      </button>
      <h3>Add Pokemon for Comparison</h3>
    </div>
    <div v-else class="compare-element" :key="pokemon?.id">
      <div class="compare-info">
        <div class="compare-details">
          <h3>{{ pokemon?.name }}</h3>
          <img :src="pokemon?.image" alt="pokemon" class="compare-image" />
        </div>
        <div class="pokemon-types-container">
          <div class="pokemon-types">
            <h4 class="pokemon-type-title">Type</h4>
            <div class="pokemon-type-icons">
              <div v-for="(type, index) in pokemon?.types" :key="index" class="pokemon-type">
                <img :src="type[Object.keys(type)[0]].image" alt="pokemon type" class="pokemon-type-image"
                  loading="lazy" />
              </div>
            </div>
          </div>
          <div class="pokemon-types">
            <h4 class="pokemon-type-title">Strength</h4>
            <div class="pokemon-type-icons">
              <div v-for="stat in createStatsArray(pokemon?.types || [], 'strength')" :key="stat.name"
                class="pokemon-type">
                <img :src="stat.image" alt="" class="pokemon-type-image" />
              </div>
            </div>
          </div>
          <div class="pokemon-types">
            <h4 class="pokemon-type-title">Weakness</h4>
            <div class="pokemon-type-icons">
              <div v-for="stat in createStatsArray(pokemon?.types || [], 'weakness')" :key="stat.name"
                class="pokemon-type">
                <img :src="stat.image" alt="" class="pokemon-type-image" />
              </div>
            </div>
          </div>
          <div class="pokemon-types">
            <h4 class="pokemon-type-title">Resistance</h4>
            <div class="pokemon-type-icons">
              <div v-for="stat in createStatsArray(pokemon?.types || [], 'resistance')" :key="stat.name"
                class="pokemon-type">
                <img :src="stat.image" alt="" class="pokemon-type-image" />
              </div>
            </div>
          </div>
          <div class="pokemon-types">
            <h4 class="pokemon-type-title">Vulnerable</h4>
            <div class="pokemon-type-icons">
              <div v-for="stat in createStatsArray(pokemon?.types || [], 'vulnerable')" :key="stat.name"
                class="pokemon-type">
                <img :src="stat.image" alt="" class="pokemon-type-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="compare-action-buttons">
        <button class="compare-btn" @click="addPokemon(pokemon as userPokemonsType)">
          Add
        </button>
        <button class="compare-btn" @click="viewPokemon(pokemon?.id.toString() ?? '')">
          View
        </button>
        <button class="compare-btn" @click="removePokemon(pokemon?.id.toString() ?? '')">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import { pokemonTypes } from '../utils';
import { useRouter } from 'vue-router';
import { pokemonStatType, pokemonTypeInterface, userPokemonsType } from '../utils/types';
import { usePokemonStore } from '../store/pokemon';

const { pokemon } = defineProps<{ pokemon?: userPokemonsType; isEmpty?: boolean }>();
const store = usePokemonStore();
const router = useRouter();

const navigateToSearch = () => {
  router.push('/');
};

const addPokemon = (pokemon: userPokemonsType) => {
  console.log(pokemon);
};

const viewPokemon = (id: string) => {
  store.setPokemonTab('description');
  store.setCurrentPokemon(undefined);
  router.push(`/pokemon/${id}`);
};

const removePokemon = (id: string) => {
  store.removeCompareQueue(id);
};

const createStatsArray = (
  types: pokemonTypeInterface[],
  statType: pokemonStatType
) => {
  const statsArray: { name: string; image: string }[] = [];
  const statsSet = new Set<string>();
  types.forEach((type: pokemonTypeInterface) => {
    const key = Object.keys(type)[0];
    type[key][statType].forEach((stat: string) => {
      if (!statsSet.has(stat)) {
        // @ts-ignore
        statsArray.push({ name: stat, image: pokemonTypes[stat].image });
        statsSet.add(stat);
      }
    });
  });
  return statsArray;
};
</script>