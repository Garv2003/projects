import { defineStore } from 'pinia'
import { genericPokemonType } from '../utils/types'

export const usePokemonStore = defineStore({
    id: 'pokemon',
    state: () => ({
        currentPokemonTab: '',
        currentPokemon: null,
        pokemonsData: [] as genericPokemonType[],
        allPokemons: [],
        compareQueue: [] as any[],
        pokemons: [] as any[]
    }),
    actions: {
        setPokemonTab(tab: string) {
            this.currentPokemonTab = tab;
        },
        setCurrentPokemon(pokemon: any) {
            this.currentPokemon = pokemon;
        },
        setPokemonsData(pokemons: genericPokemonType[]) {
            this.pokemonsData = pokemons;
        },
        setAllPokemons(pokemons: any) {
            this.allPokemons = pokemons;
        },
        setCompareQueue(pokemons: any) {
            this.compareQueue.push(pokemons);
        },
        removeCompareQueue(id: string) {
            this.compareQueue = this.compareQueue.filter((pokemon) => pokemon.id !== id);
        },
        setPokemons(pokemons: any) {
            this.pokemons = pokemons;
        }
    }
})