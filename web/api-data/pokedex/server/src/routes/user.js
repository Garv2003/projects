import joi from 'joi';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Pokemon from "../models/pokemon.js";

const userPlugin = {
    name: 'userPlugin',
    version: '1.0.0',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/user',
            handler: async function (request, h) {
                try {
                    const pokemons = await Pokemon.find({ user_id: request.user._id });
                    return {
                        user: {
                            id: request.user._id,
                            name: request.user.name,
                            email: request.user.email,
                            pokemons: pokemons
                        },
                        success: true,
                        message: 'User info retrieved successfully'
                    }
                } catch (err) {
                    return h.response(err).code(500);
                }
            }
        });
        server.route({
            method: 'POST',
            path: '/login',
            options: {
                auth: false,
                validate: {
                    payload: joi.object({
                        email: joi.string().email().required(),
                        password: joi.string().min(6).required()
                    })
                }
            },
            handler: async function (request, h) {
                const { email, password } = request.payload;
                try {
                    const user = await User.findOne({ email });
                    if (!user) {
                        return h.response({
                            success: false,
                            message: 'User not found'
                        }).code(404);
                    }
                    const isValid = await bcrypt.compare(password, user.password);
                    if (!isValid) {
                        return h.response('Invalid password').code(401);
                    }
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                    return {
                        token,
                        success: true,
                        message: 'Logged in successfully'
                    };
                } catch (err) {
                    return h.response({
                        success: false,
                        message: 'Internal server error'
                    }).code(500);
                }
            }
        });
        server.route({
            method: 'POST',
            path: '/register',
            options: {
                auth: false,
                validate: {
                    payload: joi.object({
                        name: joi.string().required(),
                        email: joi.string().email().required(),
                        password: joi.string().min(6).required()
                    })
                }
            },
            handler: async function (request, h) {
                const { name, email, password } = request.payload;
                try {

                    const user = await User.findOne({ email });

                    if (user) {
                        return h.response({
                            success: false,
                            message: 'User already exists'
                        }).code(409);
                    }

                    const hashedPassword = await bcrypt.hash(password, 10);

                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword
                    });

                    await newUser.save();

                    return h.response({
                        success: true,
                        message: 'User created successfully'
                    }).code(201);
                } catch (err) {
                    return h.response({
                        success: false,
                        message: 'Internal server error'
                    }).code(500);
                }
            },
        });
    }
};

export default userPlugin;