import Pokemon from '../models/pokemon.js';
import joi from 'joi';

const pokemonPlugin = {
    name: 'pokemonPlugin',
    version: '1.0.0',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/get_pokemon',
            handler: async function (request, h) {
                try {
                    const pokemons = await Pokemon.find({ user_id: request.user._id });
                    return h.response({
                        pokemons,
                        success: true,
                        message: 'Pokemons retrieved successfully'
                    }).code(200);
                } catch (err) {
                    return h.response({
                        success: false,
                        message: 'Failed to retrieve pokemons'
                    }).code(500);
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/create_pokemon',
            handler: async function (request, h) {
                try {
                    const { name, id, image, types } = request.payload.pokemon
                    const pokemon = new Pokemon({ name, types, id, image, user_id: request.user._id });
                    const savedPokemon = await pokemon.save();
                    return h.response({
                        pokemon: savedPokemon,
                        success: true,
                        message: 'Pokemon created successfully'
                    }).code(201);
                } catch (err) {
                    console.log(err);
                    return h.response({
                        success: false,
                        message: 'Failed to create pokemon'
                    }).code(500);
                }
            }
        });

        server.route({
            method: 'DELETE',
            path: '/delete_pokemon/{id}',
            options: {
                validate: {
                    params: joi.object({
                        id: joi.string().required()
                    })
                }
            },
            handler: async function (request, h) {
                try {
                    const id = request.params.id;
                    const deletedPokemon = await Pokemon.findByIdAndDelete(id);
                    if (!deletedPokemon) {
                        return h.response({
                            success: false,
                            message: 'Pokemon not found'
                        }).code(404);
                    }
                    return h.response({
                        message: 'Pokemon deleted successfully',
                        success: true
                    }).code(200);
                } catch (err) {
                    return h.response({
                        success: false,
                        message: 'Failed to delete pokemon'
                    }).code(500);
                }
            }
        });
    }
};

export default pokemonPlugin;