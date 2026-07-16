import { defineStore } from 'pinia'
import { UserType } from "../utils/types";

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: null as UserType | null
    }),
    actions: {
        setUser(user: any) {
            this.user = user;
        },
        removePokemon(pokemonId: string) {
            if (this.user) {
                this.user.pokemons = this.user.pokemons?.filter((pokemon) => pokemon._id !== pokemonId) ?? [];
            }
        }
    }
})