import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { jwt } from "better-auth/plugins"

const client = new MongoClient(
  `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ac-n9vqlya-shard-00-00.d1i0h77.mongodb.net:27017,ac-n9vqlya-shard-00-01.d1i0h77.mongodb.net:27017,ac-n9vqlya-shard-00-02.d1i0h77.mongodb.net:27017/?ssl=true&replicaSet=atlas-7upjpt-shard-0&authSource=admin`
)
const db = client.db("gearoradb")

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    // Matches the client-side rule shown on the sign-up form (>= 6 chars);
    // BetterAuth's default of 8 would reject valid registrations.
    minPasswordLength: 6,
    autoSignIn: false,
  },
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  // Add this section to allow custom fields:
  user: {
    additionalFields: {
      role: {
        type: ["customer", "owner", "admin"],
        input: true,
        required: false,
        defaultValue: "customer",
      },
      phone: {
        type: "string",
        input: true,
        required: false,
      },
      address: {
        type: "string",
        input: true,
        required: false,
      },
    },
  },
  plugins: [
        jwt(), 
    ],
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 7*24*60*60,
        }
    },
})
