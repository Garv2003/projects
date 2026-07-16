<script setup lang="ts">
import { ref } from 'vue';
import Card from './components/Card.vue';

const search = ref<string>('');
const results = ref<any[]>([]);
const resultsCount = ref<number>(0);

const searchWikipedia = async (searchTerm: string) => {

  if (!searchTerm) {
    alert('Please enter a search term');
    return;
  }

  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(searchTerm)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    results.value = data.query.search;
    resultsCount.value = data.query.search.length;
  } catch (error) {
    alert('Error : ' + error);
  }
};


</script>

<template>

  <div class="container">
    <header>
      <h1>Wiki Searcher</h1>
      <form class="search-box" @submit.prevent="searchWikipedia(search)">
        <input type="search" placeholder="What do you want to search?" v-model="search" />
        <button type="submit">Search</button>
      </form>
      <div>Results Count : {{ resultsCount }}</div>
    </header>
    <div class="results">
      <Card v-for="result in results" :key="result.pageid" :result="result" />
    </div>
  </div>
</template>

<style scoped></style>
