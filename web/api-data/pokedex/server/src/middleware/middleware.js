import User from "../models/user.js";
import hapiAuthJwt2 from 'hapi-auth-jwt2';

const validate = async function (decoded, request, h) {
    const user = await User.findById(decoded.id);
    if (!user) {
        return { isValid: false };
    }
    request.user = user;
    return { isValid: true };
};

const middlewarePlugin = {
    name: 'middlewarePlugin',
    version: '1.0.0',
    register: async function (server, options) {
        await server.register(hapiAuthJwt2);
        server.auth.strategy('jwt', 'jwt', {
            key: process.env.JWT_SECRET,
            validate,
            verifyOptions: { algorithms: ['HS256'] }
        });
        server.auth.default('jwt');
    }
};

export default middlewarePlugin;