import mongoose, { mongo } from "mongoose";

const globalWithMongoose = global as typeof globalThis & {
    mongoose?: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
};

const cached = globalWithMongoose.mongoose || { conn: null, promise: null };

export default async function connectDB() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URL as string).then(mongoose => mongoose)
    }
    try {
        cached.conn = await cached.promise
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
    return cached.conn
} 