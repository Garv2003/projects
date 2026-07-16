<template>
  <Wrapper>
    <div v-if="!token"
      style="display: flex;flex-direction: column; justify-content: center; align-items: center; font-size: 20px; font-weight: 600; color: #fff;">
      <div>Please login to view profile</div>
      <router-link to="/login" style="color: #f00; margin-left: 10px;">
        <button
          style="padding: 10px 20px; background-color: red; color: #fff; border: none; border-radius: 5px; cursor: pointer;margin-top: 10px;">Login</button>
      </router-link>
    </div>
    <template v-else>
      <div class="profile-container" v-if="!isLoading">
        <div class="profile-box">
          <h3>Profile</h3>
          <div class="profile-details">
            <span class="profile-item">
              <strong>Username:</strong>
              <span v-if="store.user">{{ store.user.name }}</span>
            </span>
            <span class="profile-item">
              <strong>Email:</strong>
              <span>{{ store.user?.email }}</span>
            </span>
          </div>
        </div>
        <div class="profile-box" style="width: 60vw;">
          <div v-if="store.user && store.user.pokemons.length === 0">
            <div>No Pokemons Saved</div>
          </div>
          <PokemonCardGrid :pokemons="user?.pokemons as userPokemonsType[]" :morePokemons="() => false" />
        </div>
      </div>
      <Loader v-else />
    </template>
  </Wrapper>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { Wrapper } from "../layouts";
import { useUserStore } from '../store/user';
import { PokemonCardGrid, Loader } from '../components';
import { userPokemonsType } from '../utils/types';
import { storeToRefs } from 'pinia';

const store = useUserStore();
const { user } = storeToRefs(store);
const isLoading = ref(true);
const token = localStorage.getItem('token');

const fetchUser = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(import.meta.env.VITE_SERVER_API + '/auth/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.data.success) {
      store.setUser(response.data.user);
    } else {
      alert('Please login to view profile');
    }
  } catch (error: any) {
    console.error(error);
    alert('An error occurred');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchUser();
});
</script>
