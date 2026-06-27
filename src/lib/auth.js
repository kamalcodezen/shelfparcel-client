import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URL);
const db = client.db(process.env.MONGO_DB_NAME);

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: mongodbAdapter(db, {
        client
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "user" //  UPDATED: Changed from 'default' to 'defaultValue' for modern Better Auth fields configuration
            }
        }
    },

    //  ADDED: Better Auth database hook to enforce role binding before final database write operations
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    return {
                        data: {
                            ...user,
                            role: user.role || "user", // Directly intercepts Google OAuth payloads to inject the fallback user role state
                        }
                    };
                },
            },
        },
    },
});






// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { admin } from "better-auth/plugins"


// const client = new MongoClient(process.env.MONGO_DB_URL);
// const db = client.db(process.env.MONGO_DB_NAME);

// export const auth = betterAuth({
//     emailAndPassword: {
//         enabled: true,
//     },
//     database: mongodbAdapter(db, {
//         // Optional: if you don't provide a client, database transactions won't be enabled.
//         client
//     }),
//     socialProviders: {
//         google: {
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         },
//     },


//     user: {
//         additionalFields: {
//             role: {
//                 default: "user"
//             }
//         }
//     },



// });