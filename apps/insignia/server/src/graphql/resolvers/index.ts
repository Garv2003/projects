import User from '../../models/user';
import Logo from '../../models/logo';
import jwt from "jsonwebtoken";

export const resolvers = {
    Query: {
        user: async (_: any, __: any, context: any) => {
            const jwtToken = context.token.trim();

            try {
                const decoded: jwt.JwtPayload = jwt.verify(jwtToken, process.env.JWT_SECRET || "") as jwt.JwtPayload;
                const user = await User.findById(decoded.id);

                if (!user) {
                    return {
                        id: "",
                        name: "",
                        email: "",
                        message: "User is not found",
                        success: false
                    };
                } else {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        message: "Valid User Credentials",
                        success: true
                    };
                }
            } catch (error) {
                console.log(error);
                return {
                    id: "",
                    name: "",
                    email: "",
                    message: "Invalid token",
                    success: false
                };
            }
        },
        logos: async (_: any, __: any, context: any) => {
            const jwtToken = context.token;

            try {
                const decoded: jwt.JwtPayload = jwt.verify(jwtToken, process.env.JWT_SECRET || "") as jwt.JwtPayload;
                return await Logo.find({ user_id: decoded.id });
            } catch (error) {
                console.log(error);
                return [];
            }
        }
    },
    Mutation: {
        login: async (_: any, args: any, ___: any, ____: any) => {
            const { user } = args
            try {
                const userExists = await User.findOne({ email: user.email })

                if (!userExists) {
                    return {
                        success: false,
                        message: "User not found"
                    }
                }

                const isMatch = await Bun.password.verify(user.password, userExists.password)

                if (!isMatch) {
                    return {
                        success: false,
                        message: "Invalid credentials"
                    }
                }

                const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET || "", {
                    expiresIn: "1d"
                })

                return {
                    message: "Login successful",
                    success: true,
                    token
                }
            }
            catch (error) {
                return {
                    success: false,
                    message: "Something went wrong"
                }
            }
        },
        sign: async (_: any, args: any, ___: any, ____: any) => {
            const { user } = args

            try {

                const userExists = await User.findOne({ email: user.email })

                if (userExists) {
                    return {
                        success: false,
                        message: "Account already exists",
                    }
                }

                const hashPassword = await Bun.password.hash(user.password, {
                    algorithm: "bcrypt",
                    cost: 4
                });

                const newUser = new User({
                    name: user.name,
                    email: user.email,
                    password: hashPassword
                })

                await newUser.save()

                return {
                    success: true,
                    message: "User created successfully",
                }
            }
            catch (error) {
                return {
                    success: false,
                    message: "User not created",
                }
            }
        },
        createLogo: async (_: any, args: any, context: any, ____: any) => {
            const { logo } = args

            const jwtToken = context.token

            try {
                const decoded: jwt.JwtPayload = jwt.verify(jwtToken, process.env.JWT_SECRET || "") as jwt.JwtPayload;
                const user = await User.findById(decoded.id).select("-password");

                const newLogo = new Logo({
                    title: logo.title,
                    image: logo.image,
                    user_id: user?.id
                })

                newLogo.save()

                return {
                    title: newLogo.title,
                    image: newLogo.image,
                    user_id: newLogo.user_id,
                }
            }
            catch (error) {
                return {
                    title: "",
                    image: "",
                    user_id: "",
                }
            }

        }
    }
}

