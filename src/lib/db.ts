import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.URL_TO_MONGODB;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const  cached: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } = { conn: null, promise: null };



async function dbConnect()  {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {


    cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

export const config = {
    runtime: 'nodejs',
    unstable_allowDynamic: [
        // allows a single file
        "/src/db/lib/dbConnect.js",
        // use a glob to allow anything in the function-bind 3rd party module
        "/node_modules/mongoose/dist/**",
    ],
  };
