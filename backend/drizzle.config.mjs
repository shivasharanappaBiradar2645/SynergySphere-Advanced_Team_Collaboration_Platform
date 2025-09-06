import {defineConfig } from "drizzle-kit";


export default defineConfig({
    schema: "./src/db/schema.mjs",
    out: "./drizzle",
    dialect: "sqlite",
    dbCredentials:{
        url: "./base.db",
    }

});