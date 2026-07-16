<template>
    <Wrapper>
        <template v-if="!isDataLoading && currentPokemon">
            <Description v-if="currentPokemonTab === pokemonTabs.description" />
            <Evolution v-if="currentPokemonTab === pokemonTabs.evolution" />
            <Locations v-if="currentPokemonTab === pokemonTabs.locations" />
            <CapableMoves v-if="currentPokemonTab === pokemonTabs.moves" />
        </template>
        <Loader v-else />
    </Wrapper>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { importImageByFilename } from "../utils";
import { extractColors } from "extract-colors";
import { Wrapper, Navbar, Footer } from "../layouts";
import Evolution from './Pokemon/Evolution.vue';
import Locations from './Pokemon/Locations.vue';
import CapableMoves from './Pokemon/CapableMoves.vue';
import Description from './Pokemon/Description.vue';
import Loader from '../components/Loader.vue';
import { usePokemonStore } from "../store/pokemon";
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { pokemonTabs, pokemonRoute, pokemonSpeciesRoute } from "../utils/constants";

const route = useRoute();
const store = usePokemonStore();

const { currentPokemonTab, currentPokemon } = storeToRefs(store);
const isDataLoading = ref(true);

const getRecursiveEvolution = (evolutionChain: any, level: number, evolutionData: any) => {
    if (!evolutionChain.evolves_to.length) {
        return evolutionData.push({
            pokemon: {
                ...evolutionChain.species,
                url: evolutionChain.species.url.replace('pokemon-species', 'pokemon'),
            },
            level,
        });
    }
    evolutionData.push({
        pokemon: {
            ...evolutionChain.species,
            url: evolutionChain.species.url.replace('pokemon-species', 'pokemon'),
        },
        level,
    });
    return getRecursiveEvolution(evolutionChain.evolves_to[0], level + 1, evolutionData);
};

const getEvolutionData = (evolutionChain: any) => {
    const evolutionData: any = [];
    getRecursiveEvolution(evolutionChain, 1, evolutionData);
    return evolutionData;
};

const getPokemonInfo = async (image: string) => {
    const { data } = await axios.get(`${pokemonRoute}/${route.params.id}`);
    const { data: dataEncounters } = await axios.get(data.location_area_encounters);

    const {
        data: { evolution_chain: { url: evolutionURL } },
    } = await axios.get(`${pokemonSpeciesRoute}/${data.id}`);
    const { data: evolutionData } = await axios.get(evolutionURL);

    const pokemonAbilities = {
        abilities: data.abilities.map(({ ability }: any) => ability.name),
        moves: data.moves.map(({ move }: any) => move.name),
    };

    const encounters: string[] = [];
    const evolution = getEvolutionData(evolutionData.chain);
    let evolutionLevel;
    evolutionLevel = evolution.find(({ pokemon }: any) => pokemon.name === data.name).level;
    dataEncounters.forEach((encounter: any) => {
        encounters.push(encounter.location_area.name.toUpperCase().split('-').join(' '));
    });
    const stats = data.stats.map(({ stat, base_stat }: any) => ({
        name: stat.name,
        value: base_stat,
    }));
    store.setCurrentPokemon({
        id: data.id,
        name: data.name,
        types: data.types.map(({ type: { name } }: any) => name),
        image,
        stats,
        encounters,
        evolutionLevel,
        evolution,
        pokemonAbilities,
    });
    isDataLoading.value = false;
}

onMounted(async () => {
    store.setPokemonTab(pokemonTabs.description);
    const imageElement = await importImageByFilename(route.params.id.toString());

    const options = {
        pixels: 10000,
        distance: 1,
        splitPower: 10,
        colorValidator: (alpha: number = 255) => alpha > 250,
        saturationDistance: 0.2,
        lightnessDistance: 0.2,
        hueDistance: 0.083333333,
    };

    const getColor = async () => {
        const color = await extractColors(imageElement, options);
        const root = document.documentElement;
        root.style.setProperty("--accent-color", color[0].hex.split('"')[0]);
    };

    getColor();
    let image = imageElement
    if (!image) {
        image = imageElement
    }

    getPokemonInfo(image);
});

watch(
    () => route.params.id,
    async (newId) => {
        const imageElement = await importImageByFilename(newId.toString());
        isDataLoading.value = true;
        let image = imageElement;
        if (!image) {
            image = imageElement;
        }
        getPokemonInfo(image);
    }
);

</script>