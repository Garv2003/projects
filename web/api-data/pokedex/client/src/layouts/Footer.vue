<template>
  <footer>
    <div class="block"></div>
    <div class="data">
      <ul v-if="route.name === 'pokemon'">
        <li v-for="route in routes" :key="route.name" :class="{ active: store.currentPokemonTab === route.name }"
          @click="toggleTabs(route.name)">
          {{ route.value }}
        </li>
      </ul>
    </div>
    <div class="block">
      <LogOut @click="logOutUser" :size="32" v-if="userStore.user" />
      <LogIn @click="() => router.push('/login')" :size="32" v-else />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { LogOut, LogIn } from 'lucide-vue-next';
import { routes } from '../utils/constants';
import { usePokemonStore } from '../store/pokemon';
import { useUserStore } from '../store/user';
import { useRouter, useRoute } from 'vue-router';

const store = usePokemonStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const logOutUser = async () => {
  localStorage.removeItem('token');
  userStore.setUser(null);
  router.push('/login');
};

const toggleTabs = (tab: string) => {
  store.setPokemonTab(tab);
};
</script>
