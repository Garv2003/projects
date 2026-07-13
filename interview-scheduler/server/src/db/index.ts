import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Mongodb connected")
    } catch (error) {
        console.log("Mongodb connection failed")
        return process.exit(1)
    }
}

export default connectDB