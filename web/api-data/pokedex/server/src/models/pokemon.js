import { Schema, model } from 'mongoose';

const pokemonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    types: {
        type: Array,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default model('Pokemon', pokemonSchema);