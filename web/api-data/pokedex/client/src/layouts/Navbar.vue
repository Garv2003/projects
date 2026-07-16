<template>
  <nav>
    <div class="block">
      <img :src="pokeballIcon" alt="" />
    </div>
    <div class="data">
      <ul>
        <router-link v-for="(route, index) in navigationRoutes" :key="index" :to="route.route" v-if="isTab">
          <li>{{ route.name }}</li>
        </router-link>
      </ul>
    </div>
    <div class="block">
      <Menu :size="32" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { navigationRoutes } from "../utils/constants";
import pokeballIcon from '../assets/pokeball-icon.png';
import { Menu } from 'lucide-vue-next';

const route = useRoute();
const isTab = route.path !== '/login' && route.path !== '/register';
</script>
