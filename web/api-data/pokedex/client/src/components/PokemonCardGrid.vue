<template>
  <div class="pokemon-card-grid-container">
    <div class="pokemon-card-grid">
      <div v-if="props.pokemons && props.pokemons.length > 0" v-for="data in props.pokemons" :key="data.id"
        class="pokemon-card">
        <div class="pokemon-card-list">
          <Plus v-show="route.path === '/pokemon' || route.path === '/'" class="plus" @click="addPokemonToList(data)" />
          <Trash v-if="route.path === '/profile'" class="trash" @click="removePokemon(data._id)" />
        </div>
        <div class="pokemon-card-compare">
          <GitCompare @click="comparePokemon(data)" />
        </div>
        <h3 class="pokemon-card-title">{{ data.name }}</h3>
        <img :src="data.image" alt="" class="pokemon-card-image" loading="lazy"
          @click="viewPokemon(data.id.toString())" />
        <div class="pokemon-card-types">
          <div v-for="(type, index) in data.types" :key="index" class="pokemon-card-types-type">
            <img :src="type[Object.keys(type)[0]].image" alt="pokemon type" class="pokemon-card-types-type-image"
              loading="lazy" />
            <h6 class="pokemon-card-types-type-text">{{ Object.keys(type)[0] }}</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button class="more-button" v-show="route.path === '/'" @click="props.morePokemons">More</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { usePokemonStore } from '../store/pokemon';
import { useUserStore } from '../store/user';
import { pokemonTabs } from '../utils/constants';
import { userPokemonsType } from '../utils/types';
import { Trash, Plus, GitCompare } from 'lucide-vue-next';
import axios from 'axios';

const props = defineProps<{ pokemons: userPokemonsType[], morePokemons: () => void }>();
const route = useRoute();
const router = useRouter();
const pokemonStore = usePokemonStore();
const userStore = useUserStore();

const addPokemonToList = async (data: userPokemonsType) => {
  const res = await axios.post(`${import.meta.env.VITE_SERVER_API}/pokemon/create_pokemon`, {
    pokemon: data,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (res.data.success) {
    console.log('Pokemon added successfully');
    console.log(res.data);
  } else {
    alert('Failed to add pokemon');
  }
};

const removePokemon = async (id: string) => {
  const res = await axios.delete(`${import.meta.env.VITE_SERVER_API}/pokemon/delete_pokemon/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (res.data.success) {
    userStore.removePokemon(id);
    console.log('Pokemon removed successfully');
    console.log(res.data);
  } else {
    alert('Failed to remove pokemon');
  }

};

const comparePokemon = (data: userPokemonsType) => {
  pokemonStore.setCompareQueue(data);
};

const viewPokemon = (id: string) => {
  pokemonStore.setPokemonTab(pokemonTabs.description);
  pokemonStore.setCurrentPokemon(undefined);
  router.push(`/pokemon/${id}`);
};

</script>
